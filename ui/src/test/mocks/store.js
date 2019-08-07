import Store from '@orbit/memory';
import Coordinator from '@orbit/coordinator';
import schema from '../../data/schema';
import { getRandom, getAllBoats, generateTrip, generateMember } from './utils';

let store = {};
let coordinator = {};

if (process.env.REACT_APP_MOCK === 'true') {
  store = new Store({ schema, name: 'default' });

  coordinator = new Coordinator({
    sources: [store],
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

  store.update((t) => [t.addRecord(member)]);
  store.update((t) => members.map((member) => t.addRecord(member)));
  store.update((t) => boats.map((boat) => t.addRecord(boat)));
  store.update((t) => trips.map((trip) => t.addRecord(trip)));
  store.update((t) => myTrips.map((trip) => t.addRecord(trip)));
}

export { coordinator, store };
