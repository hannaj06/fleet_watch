import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableCell,
} from '../components/Table';

export default storiesOf('Table', module).add('base', () => {
  const data = [
    { name: 'Jane', email: 'jane@example.com', age: 35 },
    { name: 'Joe', email: 'joe@example.com', age: 28 },
    { name: 'Bill', email: 'bill@example.com', age: 25 },
    { name: 'Alice', email: 'alice@example.com', age: 50 },
  ];

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeader>Name</TableHeader>
          <TableHeader>Email</TableHeader>
          <TableHeader textRight={true}>Age</TableHeader>
          <TableHeader>Custom</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map(({ name, email, age }) => (
          <TableRow key={name}>
            <TableCell label="Name" content={name} />
            <TableCell label="Email" content={email} />
            <TableCell textRight={true} label="Age" content={age} />
            <TableCell>
              <div style={{ color: 'darkred' }}>Custom Content</div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
});
