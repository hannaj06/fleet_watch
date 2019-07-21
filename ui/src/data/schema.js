import { Schema } from '@orbit/data';

const schemaDefinition = {
  models: {
    member: {
      attributes: {
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        email: { type: 'string' },
        privateSingle: { type: 'boolean' },
      },
      relationships: {
        trips: { type: 'hasMany', model: 'trip', inverse: 'member' },
      },
    },
    boat: {
      attributes: {
        boatName: { type: 'string' },
      },
      relationships: {
        trips: { type: 'hasMany', model: 'trip', inverse: 'boat' },
      },
    },
    trip: {
      attributes: {
        launch: { type: 'string' },
        land: { type: 'string' },
        meters: { type: 'number' },
      },
      relationships: {
        member: { type: 'hasOne', model: 'member', inverse: 'trips' },
        boat: { type: 'hasOne', model: 'boat', inverse: 'trips' },
      },
    },
  },
};

const schema = new Schema(schemaDefinition);

export default schema;
