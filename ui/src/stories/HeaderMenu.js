import React from 'react';
import { storiesOf } from '@storybook/react';
import HeaderMenu from '../components/HeaderMenu';
import { BrowserRouter as Router } from 'react-router-dom';

const member = { attributes: { firstName: 'Great', lastName: 'Rower' } };

export default storiesOf('HeaderMenu', module).add('with member', () => (
  <div>
    <Router>
      <HeaderMenu member={member}></HeaderMenu>
    </Router>
  </div>
));
