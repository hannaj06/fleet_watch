import React, { useState } from 'react';
import api from '../api/client';
import { useNumberValue } from '../hooks/use-input-value';
import { useAuthState } from '../contexts/states/auth-state';
import AsyncSelect from 'react-select/async';
import { Redirect } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import Form from '../components/Form';
import Button from '../components/Button';
import Input from '../components/Input';
import DateInput from '../components/DateInput';
import notifications from '../services/notifications';

function Row() {
  const [{ member }] = useAuthState();
  const [launch, setLaunch] = useState(new Date());
  const [land, setLand] = useState();
  const meters = useNumberValue(0);
  const [boat, setBoat] = useState();
  const [shouldCancel, setShouldCancel] = useState(false);

  const cancel = (e) => {
    setShouldCancel(true);
  };

  const boatPromise = async () => {
    const boats = await api.getAllBoats();
    return boats.map((option) => {
      const value = option.id;
      const label = option.attributes.boatName;
      return { value, label };
    });
  };

  const handleSubmit = async (e) => {
    if (!boat) {
      return notifications.error('Please select a boat!');
    }
    const attributes = {
      launch,
      land,
      meters: meters.value,
    };
    const relationships = {
      member: { data: { type: 'member', id: member.id } },
      boat: { data: { type: 'boat', id: boat } },
    };
    try {
      await api.createRecord('trip', attributes, relationships);
      notifications.success('Created!');
      setShouldCancel(true);
    } catch (e) {
      console.error(e);
    }
  };

  return shouldCancel ? (
    <Redirect to="/my-trips" />
  ) : (
    <div className="m-auto max-w-sm">
      <Form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="form-label" htmlFor="boat">
            Boat
          </label>
          <div className="inline-block relative w-full">
            <AsyncSelect
              defaultOptions
              loadOptions={boatPromise}
              onChange={({ value }) => setBoat(value)}
            />
          </div>
        </div>
        <div className="mb-4">
          <DateInput
            label="Launch"
            name="launch"
            selected={launch}
            onChange={(val) => setLaunch(val)}
          ></DateInput>
        </div>
        <div className="mb-4">
          <DateInput
            label="Land"
            name="land"
            selected={land}
            onChange={(val) => setLand(val)}
          ></DateInput>
        </div>
        <div className="mb-6">
          <Input
            label="Meters"
            name="meters"
            placeholder="Meters"
            {...meters}
          />
        </div>
        <div className="flex items-center justify-between">
          <Button kind="cancel" onClick={cancel}>
            Cancel
          </Button>
          <Button kind="confirm" type="submit">
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Row;
