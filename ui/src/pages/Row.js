import React, { useState } from 'react';
import api from '../api/client';
import { useNumberValue } from '../hooks/use-input-value';
import { useAuthState } from '../contexts/states/auth-state';
import AsyncSelect from 'react-select/async';
import { Redirect } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Row() {
  const [{ member }] = useAuthState();
  const [launch, setLaunch] = useState(new Date());
  const [land, setLand] = useState();
  const meters = useNumberValue(0);
  const [boat, setBoat] = useState();
  const [shouldCancel, setShouldCancel] = useState(false);

  const cancel = (e) => {
    e.preventDefault();
    setShouldCancel(true);
  };

  const boatPromise = async () => {
    const boats = await api.getAllBoats();
    return boats.map((option) => {
      const value = option.attributes.boatName;
      const label = option.attributes.boatName;
      return { value, label };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const attributes = {
      launch,
      land,
      meters: meters.value,
    };
    try {
      const trip = await api.createRecord('trip', attributes);
      await api.updateRelationship(trip.id, 'trip', boat, 'boat');
      await api.updateRelationship(trip.id, 'trip', member.id, 'member');
    } catch (e) {
      console.error(e);
    }
  };

  return shouldCancel ? (
    <Redirect to="/my-trips" />
  ) : (
    <div className="m-auto max-w-sm">
      <form className="form" onSubmit={handleSubmit}>
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
          <label className="form-label" htmlFor="launch">
            Launch
          </label>
          <DatePicker
            className="form-input"
            name="launch"
            showTimeInput
            timeFormat="HH:mm"
            dateFormat="MMMM d, yyyy h:mm aa"
            timeCaption="Time: "
            selected={launch}
            onChange={(val) => setLaunch(val)}
          />
        </div>
        <div className="mb-4">
          <label className="form-label" htmlFor="land">
            Land
          </label>
          <DatePicker
            className="form-input"
            name="land"
            showTimeInput
            timeFormat="HH:mm"
            dateFormat="MMMM d, yyyy h:mm aa"
            timeCaption="Time: "
            selected={land}
            onChange={(val) => setLand(val)}
          />
        </div>
        <div className="mb-6">
          <label className="form-label" htmlFor="meters">
            Meters
          </label>
          <input className="form-input" name="meters" {...meters}></input>
        </div>
        <div className="flex items-center justify-between">
          <button className="btn cancel" onClick={cancel}>
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

export default Row;
