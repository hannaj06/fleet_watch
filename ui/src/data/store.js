import JSONAPISource from '@orbit/jsonapi';
import Coordinator from '@orbit/coordinator';
import schema from './schema';
import { API_ROOT } from '../api/adapter';

const store = new JSONAPISource({
  schema,
  name: 'remote',
  host: API_ROOT,
});

const coordinator = new Coordinator({
  sources: [store],
});

export { coordinator, store };
