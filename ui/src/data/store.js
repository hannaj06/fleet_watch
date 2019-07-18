import Store from '@orbit/store';
import JSONAPISource, { JSONAPISerializer } from '@orbit/jsonapi';
import Coordinator, { RequestStrategy, SyncStrategy } from '@orbit/coordinator';
import schema from './schema';
import { API_ROOT } from '../api/adapter';
import { KeyMap } from '@orbit/data';

const keyMap = new KeyMap();

class CustomJSONAPISerializer extends JSONAPISerializer {
  resourceKey(type) {
    return 'remoteId';
  }
}

const store = new Store({ schema });

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

// Query the remote server whenever the store is queried
coordinator.addStrategy(
  new RequestStrategy({
    source: 'store',
    on: 'beforeQuery',

    target: 'remote',
    action: 'pull',

    blocking: false,
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
    source: 'store',
    target: 'remote',
    blocking: false,
  })
);

export { coordinator, store };
