import React from 'react';
import Link from './Link';
import { useAuthState } from '../contexts/states/auth-state';

function Nav() {
  const [{ member }] = useAuthState();

  return (
    <nav>
      <img src="images/logo.png" alt="Riverside Boat Club"></img>
      <ul>
        <li>
          <Link to="/current">Current</Link>
        </li>
        {member ? (
          <>
            <li>
              <Link to="/row">Row</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </>
        ) : (
          <></>
        )}
        <li>
          {!member ? (
            <Link to="/login">Log In</Link>
          ) : (
            <Link to="/logout">Log Out</Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
