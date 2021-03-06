import adapter from './adapter';
import {
  coordinator as realCoordinator,
  store as realStore,
  recordIdentityFromKeys,
} from '../data/store';
import {
  coordinator as mockCoordinator,
  store as mockStore,
} from '../test/mocks/store';
import mockClient from '../test/mocks/server';

const isMock = process.env.REACT_APP_MOCK === 'true';
const store = isMock ? mockStore : realStore;
const coordinator = isMock ? mockCoordinator : realCoordinator;

let api = {
  login(email, password) {
    return adapter.post('auth/login', { email, password });
  },

  logout(token) {
    return adapter.post('auth/logout', { token });
  },

  findRecord(type, id) {
    return store.query((q) => q.findRecord({ type, id }));
  },

  findRecords(type) {
    return store.query((q) => q.findRecords(type));
  },

  createRecord(type, attributes) {
    return store.update((t) =>
      t.addRecord({
        type,
        attributes,
      })
    );
  },

  update(id, type, attributes) {
    return store.update((t) =>
      t.replaceRecord({
        id,
        type,
        attributes,
      })
    );
  },

  updateRelationship(recordId, recordType, relId, relType) {
    return store.update((t) =>
      t.replaceRelatedRecord({ id: recordId, type: recordType }, relType, {
        type: relType,
        id: relId,
      })
    );
  },

  delete(id, type) {
    return store.update((t) => t.removeRecord({ type, id }));
  },

  getSession() {
    const { id } = recordIdentityFromKeys({
      type: 'session',
      keys: { remoteId: 'current' },
    });
    return store.query((q) =>
      q.findRecord(
        { type: 'session', id },
        {
          sources: { remote: { include: ['member'] } },
        }
      )
    );
  },

  getMemberForTrip(trip) {
    return store.query((q) =>
      q.findRelatedRecord({ type: 'trip', id: trip.id }, 'member')
    );
  },

  getBoatForTrip(trip) {
    return store.query((q) =>
      q.findRelatedRecord({ type: 'trip', id: trip.id }, 'boat')
    );
  },

  getTrips(member) {
    return store.query((q) =>
      q.findRelatedRecords({ type: 'member', id: member.id }, 'trips', {
        sources: { remote: { include: ['boat', 'member'] } },
      })
    );
  },

  getAllTrips() {
    return store.query((q) => q.findRecords('trip'), {
      label: 'Find all boats',
      sources: { remote: { include: ['boat', 'member'] } },
    });
  },

  getAllBoats() {
    return this.findRecords('boat');
  },
};

if (isMock) {
  api = { ...api, ...mockClient };
}

export { store, coordinator };

export default api;
