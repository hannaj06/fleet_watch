import React, { useState, useEffect } from 'react';
import api from '../api/client';
import { zip } from '../utils';

function Current() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      console.info('Fetching current trips');
      const trips = await api.getAllTrips();
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
      <thead>
        <tr>
          <th>Name</th>
          <th>Boat</th>
          <th className="right">Launch Time</th>
        </tr>
      </thead>
      <tbody>
        {trips.map(([trip, member, boat]) => (
          <tr key={trip.id}>
            <td>
              {member.attributes.firstName} {member.attributes.lastName}
            </td>
            <td>{boat.attributes.boatName}</td>
            <td className="right">{trip.attributes.launch}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <div>Loading...</div>
  );
}

export default Current;
