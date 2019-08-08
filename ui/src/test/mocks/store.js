import MemorySource from '@orbit/memory';
import { KeyMap } from '@orbit/data';
import Coordinator from '@orbit/coordinator';
import schema from '../../data/schema';
import { getRandom, getAllBoats, generateTrip, generateMember } from './utils';

let store = {};
let coordinator = {};
let recordIdentityFromKeys = () => {};

const keyMap = new KeyMap();

if (process.env.REACT_APP_MOCK === 'true') {
  recordIdentityFromKeys = () => {
    return { id: 'current' };
  };

  store = new MemorySource({ schema, keyMap });

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

  const session = {
    type: 'session',
    id: 'current',
    relationships: {
      member: { data: { type: 'member', id: 'me' } },
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
  store.update((t) => [t.addRecord(session)]);
  store.update((t) => members.map((member) => t.addRecord(member)));
  store.update((t) => boats.map((boat) => t.addRecord(boat)));
  store.update((t) => trips.map((trip) => t.addRecord(trip)));
  store.update((t) => myTrips.map((trip) => t.addRecord(trip)));
}

export { coordinator, store, recordIdentityFromKeys };
