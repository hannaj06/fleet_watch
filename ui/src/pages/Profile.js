import React, { useState } from 'react';
import { useInputValue } from '../hooks/use-input-value';
import { Redirect } from 'react-router-dom';
import { useAuthState } from '../contexts/states/auth-state';
import Input from '../components/Input';
import Button from '../components/Button';
import Form from '../components/Form';

function Profile() {
  const [{ member }] = useAuthState();
  const firstName = useInputValue(member.attributes.firstName);
  const lastName = useInputValue(member.attributes.lastName);
  const [shouldCancel, setShouldCancel] = useState(false);

  const cancel = () => {
    setShouldCancel(true);
  };

  const handleSubmit = () => {
    alert('Saved');
  };

  return shouldCancel ? (
    <Redirect to="/my-trips" />
  ) : (
    <div className="m-auto max-w-md">
      <Form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Input
            label="First Name"
            name="firstName"
            placeholder="First Name"
            required={true}
            {...firstName}
          />
        </div>
        <div className="mb-6">
          <Input
            label="Last Name"
            name="lastName"
            placeholder="Last Name"
            required={true}
            {...lastName}
          />
        </div>
        <div className="flex items-center justify-between">
          <Button onClick={cancel}>Cancel</Button>
          <Button kind="confirm" type="submit">
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Profile;
