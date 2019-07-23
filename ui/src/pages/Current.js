import React, { useState, useEffect } from 'react';
import api from '../api/client';
import { zip } from '../utils';

function Current() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      console.info('Fetching current trips');
      let trips = await api.getAllTrips();
      const members = await Promise.all(
        trips.map(async (trip) => {
          return await api.getMemberForTrip(trip);
        })
      );
      const boats = await Promise.all(
        trips.map(async (trip) => {
          return await api.getBoatForTrip(trip);
        })
      );
      setTrips(zip(trips, members, boats));
    };
    fetchData();
  }, []);

  return trips ? (
    <table className="table">
      <thead className="thead">
        <tr>
          <th className="table-header">Name</th>
          <th className="table-header">Boat</th>
          <th className="table-header text-right">Launch</th>
        </tr>
      </thead>
      <tbody>
        {trips.map(([trip, member, boat]) => (
          <tr key={trip.id}>
            <td className="table-td">
              <span className="responsive-cell-label">Name</span>
              <span className="cell-text">
                {member.attributes.firstName} {member.attributes.lastName}
              </span>
            </td>
            <td className="table-td">
              <span className="responsive-cell-label">Boat</span>
              <span className="cell-text">{boat.attributes.boatName}</span>
            </td>
            <td className="table-td text-right">
              <span className="responsive-cell-label">Launch</span>
              <span className="cell-text">{trip.attributes.launch}</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <div>Loading...</div>
  );
}

export default Current;
