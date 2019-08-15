import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Nav from '../components/Nav';
import { BrowserRouter as Router } from 'react-router-dom';

const member = { attributes: { firstName: 'Great', lastName: 'Rower' } };

export default storiesOf('Nav', module)
  .add('base', () => (
    <div>
      <Router>
        <Nav hideNav={action('hide-nav')}></Nav>
      </Router>
    </div>
  ))
  .add('with member', () => (
    <div>
      <Router>
        <Nav hideNav={action('hide-nav')} member={member}></Nav>
      </Router>
    </div>
  ));
