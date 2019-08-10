import React, { useState } from 'react';
import { useInputValue } from '../hooks/use-input-value';
import { Redirect } from 'react-router-dom';
import { useAuthState } from '../contexts/states/auth-state';
import Input from '../components/Input';
import Button from '../components/Button';
import Form from '../components/Form';
import api from '../api/client';
import notifications from '../services/notifications';

function Profile() {
  const [{ member }, dispatch] = useAuthState();
  const firstName = useInputValue(member.attributes.firstName);
  const lastName = useInputValue(member.attributes.lastName);
  const email = useInputValue(member.attributes.email);
  const [shouldCancel, setShouldCancel] = useState(false);

  const cancel = () => {
    setShouldCancel(true);
  };

  const handleSubmit = async () => {
    const updated = await api.update(member.id, 'member', {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
    });
    dispatch({ type: 'LOAD_MEMBER', member: updated });
    notifications.success('Saved!');
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
        <div className="mb-4">
          <Input
            label="Last Name"
            name="lastName"
            placeholder="Last Name"
            required={true}
            {...lastName}
          />
        </div>
        <div className="mb-6">
          <Input
            label="Email"
            name="email"
            placeholder="Email"
            required={true}
            {...email}
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
