import MemorySource from '@orbit/memory';
import { KeyMap } from '@orbit/data';
import JSONAPISource, { JSONAPISerializer } from '@orbit/jsonapi';
import IndexedDBSource from '@orbit/indexeddb';
import IndexedDBBucket, { supportsIndexedDB } from '@orbit/indexeddb-bucket';
import LocalStorageBucket from '@orbit/local-storage-bucket';
import Coordinator, {
  EventLoggingStrategy,
  RequestStrategy,
  SyncStrategy,
  LogTruncationStrategy,
} from '@orbit/coordinator';
import schema from './schema';
import config from '../config';

const { API_ROOT } = config;

const keyMap = new KeyMap();

const BucketClass = supportsIndexedDB() ? IndexedDBBucket : LocalStorageBucket;
const bucket = new BucketClass({ namespace: 'fleetwatch-bucket' });

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
  resourceAttribute(type, attr) {
    return attr.replace(/[A-Z]/g, (char, index) => {
      return (index !== 0 ? '_' : '') + char.toLowerCase();
    });
  }
}

const memory = new MemorySource({ schema, keyMap, bucket });

const remote = new JSONAPISource({
  schema,
  keyMap,
  bucket,
  name: 'remote',
  host: API_ROOT,
  SerializerClass: CustomJSONAPISerializer,
});

remote.requestProcessor.defaultFetchSettings.credentials = 'include';

const backup = new IndexedDBSource({
  schema,
  bucket,
  name: 'backup',
  namespace: 'fleetwatch',
});

const coordinator = new Coordinator({
  sources: [memory, remote, backup],
});

// Log all the things
coordinator.addStrategy(new EventLoggingStrategy());
coordinator.addStrategy(new LogTruncationStrategy());

coordinator.addStrategy(
  new SyncStrategy({
    source: 'memory',
    target: 'backup',
    blocking: true,
  })
);

// Query the remote server whenever the store is queried
coordinator.addStrategy(
  new RequestStrategy({
    source: 'memory',
    on: 'beforeQuery',
    target: 'remote',
    action: 'query',
    blocking(query) {
      if (
        query.expression.op === 'findRecord' &&
        (query.expression.record.type === 'session' ||
          query.expression.record.type === 'member')
      ) {
        return true;
      }
      return false;
    },
    // catch(e) {
    //   // https://github.com/orbitjs/orbit/issues/653
    //   console.log('beforeQuery error');
    //   this.source.requestQueue.skip(e);
    //   this.target.requestQueue.skip(e);
    //   throw e;
    // },
  })
);

// Update the remote server whenever the store is updated
coordinator.addStrategy(
  new RequestStrategy({
    on: 'beforeUpdate',
    source: 'memory',
    target: 'remote',
    action: 'update',
    blocking: false,
    // catch(e) {
    //   console.log('beforeUpdate error');
    //   this.source.requestQueue.skip(e);
    //   this.target.requestQueue.skip(e);
    //   throw e;
    // },
  })
);

// Sync all changes received from the remote server to the store
coordinator.addStrategy(
  new SyncStrategy({
    source: 'remote',
    target: 'memory',
    blocking: false,
    // catch(e) {
    //   console.log('sync error');
    //   this.source.requestQueue.skip(e);
    //   this.target.requestQueue.skip(e);
    //   throw e;
    // },
  })
);

// coordinator.addStrategy(
//   new RequestStrategy({
//     source: 'memory',
//     on: 'query',
//     blocking: false,
//     catch(e) {
//       console.log('pull error');
//       this.source.requestQueue.skip(e);
//       this.target.requestQueue.skip(e);
//       throw e;
//     },
//   })
// );

const store = memory;

export { coordinator, store, recordIdentityFromKeys };
