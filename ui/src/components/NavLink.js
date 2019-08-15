import React from 'react';
import Link from './utils/Link';

function NavLink({
  show = true,
  to,
  color,
  icon,
  children,
  label,
  onClick,
  className,
}) {
  const classes = `mr-6 my-2 md:my-0 ${className ? className : ''}`;
  return show ? (
    <li className={classes}>
      <Link
        to={to}
        onClick={onClick}
        activeClassName={`text-${color}-700 hover:text-gray-700 border-${color}-700`}
        className={`block py-1 md:py-3 px-3 align-middle text-gray-700 no-underline hover:text-gray-900 border-b-2 border-white hover:border-${color}-700`}
      >
        {icon
          ? React.cloneElement(icon, {
              className: 'inline-block align-middle mr-3',
              'aria-hidden': true,
            })
          : ''}
        <span className="pb-1 md:pb-0 text-sm">{label ? label : children}</span>
      </Link>
    </li>
  ) : (
    <></>
  );
}

export default NavLink;
