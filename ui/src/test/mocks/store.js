import Store from '@orbit/store';
import Coordinator from '@orbit/coordinator';
import schema from '../../data/schema';
import { getRandom, getAllBoats, generateTrip, generateMember } from './utils';

let mockStore = {};
let mockCoordinator = {};

if (process.env.REACT_APP_MOCK === 'true') {
  mockStore = new Store({ schema, name: 'default' });

  mockCoordinator = new Coordinator({
    sources: [mockStore],
  });

  const member = {
    type: 'member',
    id: 'me',
    attributes: {
      firstName: 'Jane',
      lastName: 'Doe',
    },
  };

  const members = Array(10)
    .fill(0)
    .map(() => {
      return generateMember();
    });

  const trips = Array(10)
    .fill(0)
    .map(() => {
      return generateTrip(getRandom(members).id);
    });

  const myTrips = Array(10)
    .fill(0)
    .map(() => {
      return generateTrip();
    });

  const boats = getAllBoats();

  mockStore.update((t) => [t.addRecord(member)]);
  mockStore.update((t) => members.map((member) => t.addRecord(member)));
  mockStore.update((t) => boats.map((boat) => t.addRecord(boat)));
  mockStore.update((t) => trips.map((trip) => t.addRecord(trip)));
  mockStore.update((t) => myTrips.map((trip) => t.addRecord(trip)));

  mockStore.on('transform', (transform) => {
    console.debug(transform);
  });

export { mockCoordinator, mockStore };
