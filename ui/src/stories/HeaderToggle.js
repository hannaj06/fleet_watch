import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import HeaderToggle from '../components/HeaderToggle';

export default storiesOf('HeaderToggle', module).add('base', () => (
  <div>
    <HeaderToggle toggleNav={action('toggle-nav')}></HeaderToggle>
  </div>
));
