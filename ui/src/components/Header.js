import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { Nav, Link } from './components';
import { useAuthState } from '../contexts/states/auth-state';

function Header() {
  const [{ member }] = useAuthState();
  const [showMenu, setShowMenu] = useState(false);
  const [showNav, setShowNav] = useState(false);

  const hideNav = function() {
    setShowNav(false);
  };

  return (
    <div className="bg-white fixed w-full z-10 top-0 shadow">
      <div className="w-full container mx-auto flex flex-wrap items-center mt-0 pt-3 pb-3 md:pb-0">
        <div className="w-1/2 pl-2 md:pl-0 text-blue-800">
          {/* <FaShip className="text-4xl inline-block pr-3 align-middle" /> */}
          <h1 className="text-2xl font-bold inline-block align-middle app-title">
            Fleet Watch
          </h1>
        </div>
        <div className="w-1/2 pr-0">
          <div className="flex relative inline-block float-right">
            <div className="relative text-sm">
              {member ? (
                <button
                  id="userButton"
                  className="flex items-center focus:outline-none mr-3 pt-2"
                  onClick={() => setShowMenu(!showMenu)}
                >
                  <FaUser className="mr-3" />
                  <span className="hidden md:inline-block">
                    Hi, {member.attributes.firstName}{' '}
                    {member.attributes.lastName}
                  </span>
                  <svg
                    className="pl-2 h-2"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 129 129"
                    enableBackground="new 0 0 129 129"
                  >
                    <g>
                      <path d="m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z"></path>
                    </g>
                  </svg>
                </button>
              ) : (
                <></>
              )}
              {showMenu ? (
                <div
                  id="userMenu"
                  className="bg-white rounded shadow-md mt-2 absolute mt-12 top-0 right-0 min-w-full overflow-auto z-30"
                >
                  <ul className="list-reset">
                    <li>
                      <Link
                        to="/profile"
                        className="px-4 py-2 block text-gray-900 hover:bg-gray-400 no-underline hover:no-underline"
                        onClick={() => setShowMenu(false)}
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <hr className="border-t mx-2 border-gray-400" />
                    </li>
                    <li>
                      <Link
                        to="/logout"
                        className="px-4 py-2 block text-gray-900 hover:bg-gray-400 no-underline hover:no-underline"
                        onClick={() => setShowMenu(false)}
                      >
                        Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              ) : (
                <></>
              )}
            </div>

            <div className="block lg:hidden pr-4">
              <button
                id="nav-toggle"
                className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-gray-900 hover:border-teal-500 appearance-none focus:outline-none"
                onClick={() => setShowNav(!showNav)}
              >
                <svg
                  className="fill-current h-3 w-3"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Menu</title>
                  <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <Nav showNav={showNav} hideNav={hideNav} />
      </div>
    </div>
  );
}

export default Header;
