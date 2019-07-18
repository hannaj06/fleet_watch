import React, { useCallback, useState, useEffect } from 'react';
import MyTrips from '../components/MyTrips';
import api from '../api/client';
import { zip, get } from '../utils';
import { useInputValue, useNumberValue } from '../hooks/use-input-value';
import { useAuthState } from '../contexts/states/auth-state';

function TripForm(props) {
  const { boats, cancel, member } = props;
  const boat = useInputValue(get(boats[0], 'attributes.boatName'));
  const launch = useInputValue('');
  const land = useInputValue('');
  const meters = useNumberValue(0);

  const handleSubmit = () => {
    props.handleSubmit(
      {
        boat: boat.value,
        launch: launch.value,
        land: land.value,
        meters: meters.value,
      },
      boat.value,
      member.id
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="group">
        <label htmlFor="boat">Boat</label>
        <select name="boat" {...boat}>
          {boats.map((option) => (
            <option key={option.id} value={option.attributes.boatName}>
              {option.attributes.boatName}
            </option>
          ))}
        </select>
      </div>
      <div className="group">
        <label htmlFor="launch">Launch</label>
        <input name="launch" {...launch}></input>
      </div>
      <div className="group">
        <label htmlFor="land">Land</label>
        <input name="land" {...land}></input>
      </div>
      <div className="group">
        <label htmlFor="meters">Meters</label>
        <input name="meters" {...meters}></input>
      </div>
      <div className="buttons">
        <button onClick={cancel}>Cancel</button>
        <button type="submit">Save</button>
      </div>
    </form>
  );
}

function Row() {
  const [{ member }] = useAuthState();
  const [boats, setBoats] = useState([]);
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      console.info('Fetching boat options');
      const boats = await api.getAllBoats();
      setBoats(boats);
    };
    fetchData();
  }, [member]);

  const fetchData = async () => {
    console.info('Fetching my trips');
    const trips = await api.getTrips(member);
    const tripBoats = await Promise.all(
      trips.map(async (trip) => {
        return await api.getBoatForTrip(trip);
      })
    );
    setTrips(zip(trips, tripBoats));
  };

  const dataCallback = useCallback(fetchData, [member]);

  useEffect(() => {
    dataCallback();
  }, [dataCallback]);

  const handleSubmit = async (attributes, boatId, memberId) => {
    try {
      const trip = await api.createRecord('trip', attributes);
      await api.updateRelationship(trip.id, 'trip', boatId, 'boat');
      await api.updateRelationship(trip.id, 'trip', memberId, 'member');
      fetchData();
      setRow(false);
    } catch {}
  };

  const cancel = () => {
    setRow(false);
  };

  const [row, setRow] = useState(false);

  return (
    <div>
      {row ? (
        <TripForm
          member={member}
          boats={boats}
          cancel={cancel}
          handleSubmit={handleSubmit}
        />
      ) : (
        <button onClick={() => setRow(true)}>Row</button>
      )}
      <h3>My Trips</h3>
      <MyTrips fetchData={fetchData} trips={trips} boats={boats} />
    </div>
  );
}

export default Row;
