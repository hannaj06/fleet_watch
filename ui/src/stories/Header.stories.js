import React from 'react';
import { storiesOf } from '@storybook/react';
import Header from '../components/Header';
import { BrowserRouter as Router } from 'react-router-dom';

const member = { attributes: { firstName: 'Great', lastName: 'Rower' } };

export default storiesOf('Header', module)
  .add('base', () => (
    <div>
      <Router>
        <Header></Header>
      </Router>
    </div>
  ))
  .add('with member', () => (
    <div>
      <Router>
        <Header member={member}></Header>
      </Router>
    </div>
  ));
