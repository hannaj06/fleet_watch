import React from 'react';
import {
  FaHome,
  FaSun,
  FaSignInAlt,
  FaListOl,
  FaTint,
  FaUser,
} from 'react-icons/fa';
import NavLink from './NavLink';

function Nav({ member, showNav, hideNav }) {
  const hasMember = member ? true : false;
  const navClass = `w-full flex-grow lg:flex lg:items-center lg:w-auto lg:block mt-2 lg:mt-0 bg-white z-20 ${
    showNav ? '' : 'hidden'
  }`;

  const links = [
    {
      to: '/current',
      label: 'Current Boats',
      color: 'orange',
      icon: <FaHome />,
      onClick: () => hideNav(),
    },
    {
      to: '/my-trips',
      label: 'My Trips',
      color: 'purple',
      icon: <FaListOl />,
      show: hasMember,
      onClick: () => hideNav(),
    },
    {
      to: '/row',
      label: 'Row',
      color: 'green',
      icon: <FaTint />,
      show: hasMember,
      onClick: () => hideNav(),
    },
    {
      className: 'ml-auto',
      to: '/weather',
      label: 'Weather',
      color: 'red',
      icon: <FaSun />,
      onClick: () => hideNav(),
    },
    {
      to: '/profile',
      label: 'Profile',
      color: 'blue',
      icon: <FaUser />,
      show: hasMember,
      onClick: () => hideNav(),
    },
    {
      to: '/login',
      label: 'Login',
      color: 'blue',
      icon: <FaSignInAlt />,
      show: !hasMember,
      onClick: () => hideNav(),
    },
  ];

  return (
    <nav className={navClass}>
      <ul className="lg:flex flex-1 items-center px-4 md:px-0">
        {links.map((link) => (
          <NavLink key={link.label} {...link}></NavLink>
        ))}
      </ul>

      <div className="relative pull-right pl-4 pr-4 md:pr-0"></div>
    </nav>
  );
}

export default Nav;
