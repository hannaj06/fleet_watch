import React, { useState, useEffect } from 'react';
import api from '../api/client';
import { zip } from '../utils';
import Loader from '../components/Loader';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableCell,
  TableDateCell,
} from '../components/Table';

function Current() {
  const [trips, setTrips] = useState();

  useEffect(() => {
    const fetchData = async () => {
      console.info('Fetching current trips');
      const allTrips = await api.getCurrentTrips();

      const members = allTrips.map((trip) => {
        return api.cache.getMemberForTrip(trip);
      });
      const boats = allTrips.map((trip) => {
        return api.cache.getBoatForTrip(trip);
      });
      setTrips(zip(allTrips, members, boats));
    };
    fetchData();
  }, []);

  return trips ? (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeader>Name</TableHeader>
          <TableHeader>Boat</TableHeader>
          <TableHeader textRight>Launch</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {trips.map(([trip, member, boat]) => (
          <TableRow key={trip.id}>
            <TableCell
              label="Name"
              content={`${member.attributes.firstName} ${member.attributes.lastName}`}
            />
            <TableCell
              label="Boat"
              content={boat ? boat.attributes.boatName : ''}
            />
            <TableDateCell
              textRight
              label="Launch"
              date={trip.attributes.launch}
            />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ) : (
    <Loader />
  );
}

export default Current;
