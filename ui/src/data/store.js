import Store from '@orbit/store';
import { KeyMap } from '@orbit/data';
import JSONAPISource, { JSONAPISerializer } from '@orbit/jsonapi';
import Coordinator, { RequestStrategy, SyncStrategy } from '@orbit/coordinator';
import schema from './schema';
import config from '../config';

const { API_ROOT } = config;

const keyMap = new KeyMap();

const store = new Store({ schema, keyMap });

const recordIdentityFromKeys = ({ type, id, keys }) => {
  const recordIdentity = {
    type,
    keys,
    id: id || keyMap.idFromKeys(type, keys) || schema.generateId(type),
  };
  keyMap.pushRecord(recordIdentity);
  return recordIdentity;
};

class CustomJSONAPISerializer extends JSONAPISerializer {
  resourceKey(type) {
    return 'remoteId';
  }
}

const remote = new JSONAPISource({
  schema,
  keyMap,
  name: 'remote',
  host: API_ROOT,
  SerializerClass: CustomJSONAPISerializer,
});

const coordinator = new Coordinator({
  sources: [store, remote],
});

// Log all the things
// coordinator.addStrategy(new EventLoggingStrategy());

// Query the remote server whenever the store is queried
coordinator.addStrategy(
  new RequestStrategy({
    source: 'store',
    on: 'beforeQuery',
    target: 'remote',
    action: 'pull',
    blocking(query) {
      if (
        query.expression.op === 'findRecord' &&
        (query.expression.record.type === 'session' ||
          query.expression.record.type === 'member')
      ) {
        return true;
      }
      return true;
    },
    catch(e) {
      // https://github.com/orbitjs/orbit/issues/653
      setTimeout(() => {
        this.source.requestQueue.skip();
        this.target.requestQueue.skip();
      }, 0);

      throw e;
    },
  })
);

// Update the remote server whenever the store is updated
coordinator.addStrategy(
  new RequestStrategy({
    source: 'store',
    on: 'beforeUpdate',
    target: 'remote',
    action: 'push',
    blocking: false,
  })
);

// Sync all changes received from the remote server to the store
coordinator.addStrategy(
  new SyncStrategy({
    source: 'remote',
    target: 'store',
    blocking: false,
  })
);

export { coordinator, store, recordIdentityFromKeys };
