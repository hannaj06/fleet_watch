import React, { useState } from 'react';
import Nav from './Nav';
import HeaderMenu from './HeaderMenu';
import HeaderToggle from './HeaderToggle';

function Header({ member }) {
  const [showNav, setShowNav] = useState(false);

  const hideNav = function() {
    setShowNav(false);
  };

  const toggleNav = function() {
    setShowNav(!showNav);
  };

  return (
    <div className="bg-white fixed w-full z-10 top-0 shadow-md">
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
              <HeaderMenu member={member} />
            </div>

            <div className="block lg:hidden pr-4">
              <HeaderToggle toggleNav={toggleNav} />
            </div>
          </div>
        </div>
        <Nav showNav={showNav} hideNav={hideNav} member={member} />
      </div>
    </div>
  );
}

export default Header;
