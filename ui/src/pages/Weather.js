import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaWind } from 'react-icons/fa';
import { Loader } from '../components';

function Weather() {
  const [weather, setWeather] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios
          .get('https://api.weather.gov/gridpoints/BOX/69,76/forecast')
          .then((result) => result.data.properties.periods);
        const [now, soon, later] = data;
        setWeather([now, soon, later]);
      } catch (e) {
        setWeather([]);
        console.error(e);
      }
    };
    fetchData();
  }, []);

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const detailUrl = `https://darksky.net/details/42.358,-71.1159/${year}-${month}-${date}/us12/en`;

  return weather ? (
    <>
      <div className="flex flex-row flex-wrap justify-center">
        {weather.map((weatherItem) => (
          <div
            key={weatherItem.number}
            className="w-64 m-6 shadow-md border b-gray-400 rounded flex flex-col justify-center items-center text-center p-6 bg-white"
          >
            <div className="text-md font-bold flex flex-col text-gray-900">
              <span className="uppercase">{weatherItem.name}</span>{' '}
              <span className="font-normal text-gray-700 text-sm justify-center items-center">
                {' '}
              </span>
            </div>
            <div className="w-32 h-32 flex items-center justify-center">
              <img
                className="shadow"
                src={weatherItem.icon}
                alt={weatherItem.shortForecast}
              />
            </div>
            <p className="text-gray-700 mb-2">{weatherItem.shortForecast}</p>
            <div className="text-3xl font-bold text-gray-900 mb-3">
              {weatherItem.temperature}º{weatherItem.temperatureUnit}
            </div>
            <div className="flex justify-center w-full">
              <span className="items-center text-center">
                <FaWind className="inline-block align-middle mr-2" />
                {weatherItem.windSpeed} {weatherItem.windDirection}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full text-center">
        <a
          href={detailUrl}
          className="underline italic hover:no-underline hover:text-gray-900"
          target="_blank"
          rel="noopener noreferrer"
        >
          More details
        </a>
      </div>
    </>
  ) : (
    <Loader />
  );
}

export default Weather;
