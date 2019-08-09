import React, { useState, useEffect } from 'react';
import api from '../api/client';
import { zip } from '../utils';
import { Loader } from '../components';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableCell,
} from '../components/Table';

function Current() {
  const [trips, setTrips] = useState();

  useEffect(() => {
    const fetchData = async () => {
      console.info('Fetching current trips');
      const allTrips = await api.getAllTrips();

      const members = await Promise.all(
        allTrips.map(async (trip) => {
          return await api.getMemberForTrip(trip);
        })
      );
      const boats = await Promise.all(
        allTrips.map(async (trip) => {
          return await api.getBoatForTrip(trip);
        })
      );
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
          <TableHeader textRight={true}>Launch</TableHeader>
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
            <TableCell
              textRight={true}
              label="Launch"
              content={trip.attributes.launch}
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
