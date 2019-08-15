import React from 'react';
import { storiesOf } from '@storybook/react';
import NavLink from '../components/NavLink';
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs';
import { BrowserRouter as Router } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

const colors = [
  'orange',
  'gray',
  'red',
  'green',
  'yellow',
  'teal',
  'blue',
  'indigo',
  'purple',
  'pink',
];

const stories = storiesOf('NavLink', module)
  .add('active', () => {
    const label = text('Label', 'My Stuff');
    const color = select('Color', colors, colors[0]);
    const showIcon = boolean('Show Icon', true);
    const icon = showIcon ? <FaHome /> : null;
    const onClick = (e) => {
      e.preventDefault();
    };
    return (
      <Router>
        <nav className="w-full flex-grow lg:flex lg:items-center lg:w-auto lg:block mt-2 lg:mt-0 bg-white z-20">
          <ul className="lg:flex flex-1 items-center px-4 md:px-0">
            <NavLink icon={icon} label={label} color={color} to="/"></NavLink>
            <NavLink
              icon={<FaHome />}
              label="Inactive"
              color="red"
              onClick={onClick}
              to="/foo"
            ></NavLink>
          </ul>
        </nav>
      </Router>
    );
  })
  .add('inactive', () => {
    const label = text('Label', 'My Stuff');
    const color = select('Color', colors, colors[0]);
    const showIcon = boolean('Show Icon', true);
    const icon = showIcon ? <FaHome /> : null;
    const onClick = (e) => {
      e.preventDefault();
    };
    return (
      <Router>
        <nav className="w-full flex-grow lg:flex lg:items-center lg:w-auto lg:block mt-2 lg:mt-0 bg-white z-20">
          <ul className="lg:flex flex-1 items-center px-4 md:px-0">
            <NavLink
              icon={icon}
              label={label}
              color={color}
              onClick={onClick}
              to="/nonactive"
            ></NavLink>
            <NavLink
              icon={<FaHome />}
              label="Active"
              color="green"
              to="/"
            ></NavLink>
          </ul>
        </nav>
      </Router>
    );
  });

stories.addDecorator(withKnobs);

export default stories;
