import React from 'react';
import { storiesOf } from '@storybook/react';
import Loader from '../components/Loader';

export default storiesOf('Loader', module).add('base', () => {
  return (
    <div>
      <Loader></Loader>
    </div>
  );
});
