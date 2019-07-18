import adapter from './adapter';
import {
  coordinator as realCoordinator,
  store as realStore,
} from '../data/store';
import { mockCoordinator, mockStore } from '../test/mocks/store';
import mockClient from '../test/mocks/server';

let store = realStore;
let coordinator = realCoordinator;

if (process.env.REACT_APP_MOCK === 'true') {
  store = mockStore;
  coordinator = mockCoordinator;
}

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

  getMember() {
    return this.findRecord('member', 'me');
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
      q.findRelatedRecords({ type: 'member', id: member.id }, 'trips')
    );
  },
  getAllTrips() {
    return this.findRecords('trip');
  },
  getAllBoats() {
    return this.findRecords('boat');
  },
};

if (process.env.REACT_APP_MOCK === 'true') {
  api = { ...api, ...mockClient };
}

export { store, coordinator };

export default api;
