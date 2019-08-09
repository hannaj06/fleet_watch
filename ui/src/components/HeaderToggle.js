import React from 'react';
import { FaAlignJustify } from 'react-icons/fa';

function HeaderToggle({ toggleNav }) {
  return (
    <button
      className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-gray-900 hover:border-teal-500 appearance-none focus:outline-none"
      onClick={toggleNav}
    >
      <FaAlignJustify />
    </button>
  );
}

export default HeaderToggle;
