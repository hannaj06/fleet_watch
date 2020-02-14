import React, { useCallback, useEffect, useState } from 'react';
import api from '../api/client';
import { zip } from '../utils';
import { useNumberValue } from '../hooks/use-input-value';
import { useAuthState } from '../contexts/states/auth-state';
import Loader from '../components/Loader';
import Select from 'react-select';
import Button from '../components/Button';
import Input from '../components/Input';
import DateInput from '../components/DateInput';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableCell,
  TableDateCell,
} from '../components/Table';

const METER_THRESHOLD = 10000;

function TripRow({ trip, tripBoat, boats, fetchData, member }) {
  const [isEdit, setIsEdit] = useState(false);
  const [boat, setBoat] = useState({
    value: tripBoat ? tripBoat.id : '',
    label: tripBoat ? tripBoat.attributes.boatName : '',
  });
  const [launch, setLaunch] = useState(trip.attributes.launch);
  const [land, setLand] = useState(trip.attributes.land);
  const meters = useNumberValue(trip.attributes.meters);

  const deleteTrip = async (trip) => {
    await api.delete(trip.id, 'trip');
    fetchData();
  };

  const editTrip = (trip, edit = true) => {
    setIsEdit(edit);
  };

  const saveTrip = async (trip) => {
    await api.update(trip.id, 'trip', {
      launch,
      land,
      meters: meters.value,
    });
    setIsEdit(false);
    fetchData();
  };

  const options = boats.map((option) => {
    const value = option.id;
    const label = option.attributes.boatName;
    return { value, label };
  });

  const onChange = (e) => {
    setBoat(e);
  };

  return isEdit ? (
    <>
      <TableCell className="w-1/4">
        <Select
          className="w-full"
          options={options}
          value={boat}
          onChange={onChange}
        />
      </TableCell>
      <TableCell textRight className="w-40">
        <DateInput
          showLabel={false}
          textRight
          name="launch"
          selected={launch}
          onChange={(val) => setLaunch(val)}
        />
      </TableCell>
      <TableCell textRight className="w-40">
        <DateInput
          showLabel={false}
          textRight
          name="land"
          selected={land}
          onChange={(val) => setLand(val)}
        />
      </TableCell>
      <TableCell textRight className="w-40">
        <Input textRight showLabel={false} name="meters" {...meters}></Input>
      </TableCell>
      <TableCell textRight className="table-buttons">
        <Button small kind="confirm" onClick={() => saveTrip(trip)}>
          Save
        </Button>
        <Button small onClick={() => editTrip(trip, false)}>
          Cancel
        </Button>
      </TableCell>
    </>
  ) : (
    <>
      <TableCell label="Boat" content={tripBoat.attributes.boatName} />
      <TableDateCell textRight label="Launch" date={trip.attributes.launch} />
      <TableDateCell
        textRight
        label="Land"
        fallback="On the water"
        date={trip.attributes.land}
      />
      <TableCell textRight label="Meters" content={trip.attributes.meters} />
      <TableCell textRight className="table-buttons">
        <Button kind="action" small onClick={() => editTrip(trip)}>
          Edit
        </Button>
        <Button kind="delete" small onClick={() => deleteTrip(trip)}>
          Delete
        </Button>
      </TableCell>
    </>
  );
}

function MyTrips() {
  const [{ member }] = useAuthState();
  const [boats, setBoats] = useState([]);
  const [trips, setTrips] = useState();

  useEffect(() => {
    const fetchData = async () => {
      console.info('Fetching boat options');
      const boats = await api.getAllBoats();
      setBoats(boats);
    };
    fetchData();
  }, []);

  const fetchData = async () => {
    console.info('Fetching my trips');
    const trips = await api.getTrips(member);
    const tripBoats = trips.map((trip) => {
      return api.cache.getBoatForTrip(trip);
    });
    setTrips(zip(trips, tripBoats));
  };

  const dataCallback = useCallback(fetchData, [member]);

  useEffect(() => {
    dataCallback();
  }, [dataCallback]);

  const totalMeters = (trips || []).reduce((acc, [trip]) => {
    return acc + trip.attributes.meters;
  }, 0);

  return trips ? (
    <>
      <div className="flex">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Boat</TableHeader>
              <TableHeader textRight>Launch</TableHeader>
              <TableHeader textRight>Land</TableHeader>
              <TableHeader textRight>Meters</TableHeader>
              <TableHeader></TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {trips.map(([trip, boat]) => (
              <TableRow
                className={trip.attributes.land !== null ? '' : 'in-progress'}
                key={trip.id}
              >
                <TripRow
                  fetchData={fetchData}
                  boats={boats}
                  tripBoat={boat}
                  trip={trip}
                  member={member}
                />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex mt-4">
        <div className="w-full">
          Total Meters:{' '}
          <strong>
            <span
              className={
                totalMeters < METER_THRESHOLD
                  ? 'text-red-600'
                  : 'text-green-600'
              }
            >
              {totalMeters}
            </span>{' '}
            / {METER_THRESHOLD}
          </strong>
        </div>
      </div>
    </>
  ) : (
    <Loader />
  );
}

export default MyTrips;
