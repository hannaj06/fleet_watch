import React from 'react';
import { useInputValue, useCheckboxValue } from '../hooks/use-input-value';

function Profile() {
  const firstName = useInputValue('');
  const lastName = useInputValue('');
  const autoLaunch = useCheckboxValue(false);
  const autoLogOut = useCheckboxValue(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="group">
          <label htmlFor="firstName">First Name</label>
          <input name="firstName" {...firstName}></input>
        </div>
        <div className="group">
          <label htmlFor="lastName">Last Name</label>
          <input name="lastName" {...lastName}></input>
        </div>
        <div className="group">
          <label htmlFor="autoLaunch">Auto Launch my single?</label>
          <input type="checkbox" name="autoLaunch" {...autoLaunch}></input>
        </div>
        <div className="group">
          <label htmlFor="autoLogOut">Log out after launch?</label>
          <input type="checkbox" name="autoLogOut" {...autoLogOut}></input>
        </div>
        <div className="group">
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
}

export default Profile;
