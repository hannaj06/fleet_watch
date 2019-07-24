import React, { useCallback, useEffect, useState } from 'react';
import api from '../api/client';
import { zip } from '../utils';
import { useInputValue, useNumberValue } from '../hooks/use-input-value';
import { useAuthState } from '../contexts/states/auth-state';
import Select from 'react-select';

const METER_THRESHOLD = 10000;

function TableRow({ trip, tripBoat, boats, fetchData }) {
  const [isEdit, setIsEdit] = useState(false);
  const [boat, setBoat] = useState({
    value: tripBoat.attributes.boatName,
    label: tripBoat.attributes.boatName,
  });
  const launch = useInputValue(trip.attributes.launch);
  const land = useInputValue(trip.attributes.land);
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
      launch: launch.value,
      land: land.value,
      meters: meters.value,
    });
    await api.updateRelationship(trip.id, 'trip', boat.value, 'boat');
    setIsEdit(false);
    fetchData();
  };
  const options = boats.map((option) => {
    const value = option.attributes.boatName;
    const label = option.attributes.boatName;
    return { value, label };
  });

  const onChange = (e) => {
    setBoat(e);
  };

  return isEdit ? (
    <>
      <td className="table-td w-1/4">
        <Select
          className="w-full"
          options={options}
          value={boat}
          onChange={onChange}
        />
      </td>
      <td className="table-td text-right w-40">
        <input
          className="form-input text-right"
          name="launch"
          {...launch}
        ></input>
      </td>
      <td className="table-td text-right w-40">
        <input className="form-input text-right" name="land" {...land}></input>
      </td>
      <td className="table-td text-right w-40">
        <input
          className="form-input text-right"
          name="meters"
          {...meters}
        ></input>
      </td>
      <td className="table-td table-buttons text-right">
        <button className="btn small confirm" onClick={() => saveTrip(trip)}>
          Save
        </button>
        <button className="btn small" onClick={() => editTrip(trip, false)}>
          Cancel
        </button>
      </td>
    </>
  ) : (
    <>
      <td className="table-td text-left">
        <span className="responsive-cell-label">Boat</span>
        <span className="cell-text">{tripBoat.attributes.boatName}</span>
      </td>
      <td className="table-td text-right">
        <span className="responsive-cell-label">Launch</span>
        <span className="cell-text">{trip.attributes.launch}</span>
      </td>
      <td className="table-td text-right">
        <span className="responsive-cell-label">Land</span>
        <span className="cell-text">{trip.attributes.land}</span>
      </td>
      <td className="table-td text-right">
        <span className="responsive-cell-label">Meters</span>
        <span className="cell-text">{trip.attributes.meters}</span>
      </td>
      <td className="table-td table-buttons text-right">
        <button className="btn small action" onClick={() => editTrip(trip)}>
          Edit
        </button>
        <button className="btn small delete" onClick={() => deleteTrip(trip)}>
          Delete
        </button>
      </td>
    </>
  );
}

function MyTrips() {
  const [{ member }] = useAuthState();
  const [boats, setBoats] = useState([]);
  const [trips, setTrips] = useState([]);

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
    const tripBoats = await Promise.all(
      trips.map(async (trip) => {
        return await api.getBoatForTrip(trip);
      })
    );
    setTrips(zip(trips, tripBoats));
  };

  const dataCallback = useCallback(fetchData, [member]);

  useEffect(() => {
    dataCallback();
  }, [dataCallback]);

  const totalMeters = trips.reduce((acc, [trip]) => {
    return acc + trip.attributes.meters;
  }, 0);

  return trips ? (
    <>
      <div className="flex">
        <table className="table w-full">
          <thead className="thead">
            <tr>
              <th className="table-header">Boat</th>
              <th className="table-header text-right">Launch</th>
              <th className="table-header text-right">Land</th>
              <th className="table-header text-right">Meters</th>
              <th className="table-header"></th>
            </tr>
          </thead>
          <tbody>
            {trips.map(([trip, boat]) => (
              <tr key={trip.id}>
                <TableRow
                  fetchData={fetchData}
                  boats={boats}
                  tripBoat={boat}
                  trip={trip}
                />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex">
        <div className="w-full">
          Total Meters:{' '}
          <span
            className={
              totalMeters < METER_THRESHOLD ? 'text-red-600' : 'text-green-600'
            }
          >
            {totalMeters}
          </span>{' '}
          / {METER_THRESHOLD}
        </div>
      </div>
    </>
  ) : (
    <div>Loading...</div>
  );
}

export default MyTrips;
