import React, { useState } from 'react';
import api from '../api/client';
import { useInputValue, useNumberValue } from '../hooks/use-input-value';

const METER_THRESHOLD = 500;

function TableRow({ trip, tripBoat, boats, fetchData }) {
  const [isEdit, setIsEdit] = useState(false);
  const boat = useInputValue(tripBoat.attributes.boatName);
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

  return isEdit ? (
    <>
      <td>
        <select name="boat" {...boat}>
          {boats.map((option) => (
            <option key={option.id} value={option.attributes.boatName}>
              {option.attributes.boatName}
            </option>
          ))}
        </select>
      </td>
      <td className="right">
        <input name="launch" {...launch}></input>
      </td>
      <td className="right">
        <input name="land" {...land}></input>
      </td>
      <td className="right">
        <input name="meters" {...meters}></input>
      </td>
      <td className="buttons right">
        <button onClick={() => saveTrip(trip)}>Save</button>
        <button onClick={() => editTrip(trip, false)}>Cancel</button>
      </td>
    </>
  ) : (
    <>
      <td>{tripBoat.attributes.boatName}</td>
      <td className="right">{trip.attributes.launch}</td>
      <td className="right">{trip.attributes.land}</td>
      <td className="right">{trip.attributes.meters}</td>
      <td className="buttons right">
        <button onClick={() => editTrip(trip)}>Edit</button>
        <button onClick={() => deleteTrip(trip)}>Delete</button>
      </td>
    </>
  );
}

function MyTrips({ boats, trips, fetchData }) {
  const totalMeters = trips.reduce((acc, [trip]) => {
    return acc + trip.attributes.meters;
  }, 0);

  return trips ? (
    <div>
      <table>
        <thead>
          <tr>
            <th>Boat</th>
            <th className="right">Launch Time</th>
            <th className="right">Land Time</th>
            <th className="right">Meters</th>
            <th></th>
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
      <div>
        Total Meters:{' '}
        <span className={totalMeters < METER_THRESHOLD ? 'red' : 'green'}>
          {totalMeters}
        </span>{' '}
        / {METER_THRESHOLD}
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export default MyTrips;
