import React, { useState } from 'react';
import { useInputValue } from '../hooks/use-input-value';
import { Redirect } from 'react-router-dom';
import { useAuthState } from '../contexts/states/auth-state';

function Profile() {
  const [{ member }] = useAuthState();
  const firstName = useInputValue(member.attributes.firstName);
  const lastName = useInputValue(member.attributes.lastName);
  const [shouldCancel, setShouldCancel] = useState(false);

  const cancel = (e) => {
    e.preventDefault();
    setShouldCancel(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return shouldCancel ? (
    <Redirect to="/my-trips" />
  ) : (
    <div className="m-auto max-w-md">
      <form className="form" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="form-label" htmlFor="firstName">
            First Name
          </label>
          <input className="form-input" name="firstName" {...firstName}></input>
        </div>
        <div className="mb-6">
          <label className="form-label" htmlFor="lastName">
            Last Name
          </label>
          <input className="form-input" name="lastName" {...lastName}></input>
        </div>
        <div className="flex items-center justify-between">
          <button className="btn" onClick={cancel}>
            Cancel
          </button>
          <button className="btn confirm" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default Profile;
