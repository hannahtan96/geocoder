import { useState } from 'react';
import axios from 'axios';
import NewGeoForm from './components/NewGeoForm';
import GeoList from './components/GeoList';
import Geo from './components/Geo';
import './App.css';

// require('dotenv').config();
// const BASE_URL = 'https://us1.locationiq.com/v1/search.php';
// const LOCATIONIQ_KEY = process.env.LOCATIONIQ_API_KEY;

function App() {
  const [geoData, setGeoData] = useState([]);
  // const [sameLatData, setsameLatData] = useState('');
  const [error, setError] = useState('');

  const addlocation = (newLocation) => {
    let officialName, latitude, longitude;

    axios
      .get('https://us1.locationiq.com/v1/search.php', {
        params: {
          key: 'pk.b61d5c4079680c7cb0af73df7e9c0904',
          q: newLocation.locationData,
          format: 'json'
        }
      })
      .then((response) => {
        officialName = response.data[0].display_name;
        latitude = response.data[0].lat;
        longitude = response.data[0].lon;

        const newGeoData = [...geoData];
        const nextId =
          Math.max(0, Math.max(...newGeoData.map((geo) => geo.id))) + 1;

        newGeoData.push({
          id: nextId,
          nameData: officialName,
          latData: latitude,
          lonData: longitude
        });

        setError('');
        setGeoData(newGeoData);
        // console.log('success in findLatitudeAndLongitude', latitude, longitude);
      })
      .catch((error) => {
        setError('Uh Oh! Error!\nUnable to geocode');
        console.log('error in findLatitudeAndLongitude:', error.response);
      });

    // sameLat();
  };

  /// LAST ENTRY BEHAVIOR
  const lastEntry = geoData ? geoData.at(-1) : {};

  /// SAME LATITUDE AND LONGITUDE FUN
  /*
  const sameLat = (lastEntry) => {
    let sameLatGeo;
    const randomNumber = Math.random() * 90;
    axios
      .get('https://us1.locationiq.com/v1/reverse.php', {
        params: {
          key: 'pk.b61d5c4079680c7cb0af73df7e9c0904',
          lat: randomNumber,
          lon: lastEntry.lon,
          format: 'json'
        }
      })
      .then((response) => {
        sameLatGeo = response.data[0].display_name;

        const newSameLatData = [...sameLatData];

        newSameLatData.push({
          origGeoName: lastEntry.nameData,
          sameLatGeoName: sameLatGeo
        });

        setsameLatData(newSameLatData);
        // console.log('success in findLatitudeAndLongitude', latitude, longitude);
      })
      .catch((error) => {
        setError('Uh Oh! Error!\nUnable to geocode');
        console.log('error in findLatitudeAndLongitude:', error.response);
      });
  };
  */

  return (
    <div className='App'>
      <h1 className='title'>Get Latitude and Longitude</h1>
      {error ? <div className='errorDisplay'>{error}</div> : <div></div>}
      {lastEntry ? (
        <div id='currentEntry'>
          <Geo
            name={lastEntry.nameData}
            lat={lastEntry.latData}
            lon={lastEntry.lonData}
          ></Geo>
        </div>
      ) : (
        <div></div>
      )}
      <NewGeoForm addLocationCallback={addlocation}></NewGeoForm>
      <GeoList geos={geoData}></GeoList>
      <div className='caption'>
        Running record of searches: {geoData.length}
      </div>
      {/* <div>{sameLatData}</div> */}
    </div>
  );
}

export default App;
