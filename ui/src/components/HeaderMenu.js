import React, { useState } from 'react';
import { FaAngleDown, FaUser } from 'react-icons/fa';
import { Link } from '.';

function MenuLink({ to, onClick, children }) {
  return (
    <li>
      <Link
        to={to}
        className="px-4 py-2 block text-gray-900 hover:bg-gray-400 no-underline hover:no-underline"
        onClick={onClick}
      >
        {children}
      </Link>
    </li>
  );
}

function HeaderMenu({ member }) {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = function() {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

  return member ? (
    <>
      <button
        id="userButton"
        className="flex items-center mr-3 pt-2"
        onClick={toggleMenu}
      >
        <FaUser className="mr-3" />
        <span className="hidden md:inline-block">
          Hi, {member.attributes.firstName} {member.attributes.lastName}
        </span>
        <FaAngleDown />
      </button>
      {showMenu ? (
        <div
          id="userMenu"
          className="bg-white rounded shadow-md mt-2 absolute mt-12 top-0 right-0 min-w-full overflow-auto z-30"
        >
          <ul className="list-reset">
            <MenuLink to="/profile" onClick={hideMenu}>
              Profile
            </MenuLink>
            <li>
              <hr className="border-t mx-2 border-gray-400" />
            </li>
            <MenuLink to="/logout" onClick={hideMenu}>
              Logout
            </MenuLink>
          </ul>
        </div>
      ) : (
        <></>
      )}
    </>
  ) : (
    <></>
  );
}

export default HeaderMenu;
