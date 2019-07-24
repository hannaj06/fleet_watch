import React from 'react';
import Link from './Link';
import { useAuthState } from '../contexts/states/auth-state';
import { FaHome, FaSignInAlt, FaListOl, FaTint } from 'react-icons/fa';

function NavLink({ to, color, icon, children, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      activeClassName={`text-${color}-600 hover:text-gray-600 border-${color}-600`}
      className={`block py-1 md:py-3 px-3 align-middle text-gray-600 no-underline hover:text-gray-900 border-b-2 border-white hover:border-${color}-600`}
    >
      {React.cloneElement(icon, {
        className: 'inline-block align-middle mr-3',
      })}
      <span className="pb-1 md:pb-0 text-sm">{children}</span>
    </Link>
  );
}

function Nav({ showNav, hideNav }) {
  const [{ member }] = useAuthState();
  let navClass =
    'w-full flex-grow lg:flex lg:items-center lg:w-auto lg:block mt-2 lg:mt-0 bg-white z-20';
  navClass = !showNav ? `${navClass} hidden` : navClass;

  return (
    <nav className={navClass}>
      <ul className="lg:flex flex-1 items-center px-4 md:px-0">
        <li className="mr-6 my-2 md:my-0">
          <NavLink
            to="/current"
            color="orange"
            icon={<FaHome />}
            onClick={() => hideNav()}
          >
            Current Boats
          </NavLink>
        </li>
        {member ? (
          <>
            <li className="mr-6 my-2 md:my-0">
              <NavLink
                to="/my-trips"
                color="purple"
                icon={<FaListOl />}
                onClick={() => hideNav()}
              >
                My Trips
              </NavLink>
            </li>
            <li className="mr-6 my-2 md:my-0">
              <NavLink
                to="/row"
                color="green"
                icon={<FaTint />}
                onClick={() => hideNav()}
              >
                Row
              </NavLink>
            </li>
          </>
        ) : (
          <li className="mr-6 my-2 md:my-0">
            <NavLink
              to="/login"
              color="blue"
              icon={<FaSignInAlt />}
              onClick={() => hideNav()}
            >
              Log In
            </NavLink>
          </li>
        )}
      </ul>

      <div className="relative pull-right pl-4 pr-4 md:pr-0"></div>
    </nav>
  );
}

export default Nav;
