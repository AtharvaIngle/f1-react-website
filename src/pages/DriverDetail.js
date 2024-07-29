import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './DriverDetail.css';

const driverImages = {
  norris: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Lando_Norris_2022.jpg',
  max_verstappen: 'https://upload.wikimedia.org/wikipedia/commons/7/7d/Max_Verstappen_2017_Malaysia_3_%28cropped%29.jpg',
    leclerc:'https://upload.wikimedia.org/wikipedia/commons/6/62/F12019_Leclerc_Schloss_Gabelhofen.jpg',
    piastri:'https://upload.wikimedia.org/wikipedia/commons/c/ce/Oscar_Piastri_Spa_%28cropped%29.jpg',
    sainz:'https://upload.wikimedia.org/wikipedia/commons/7/76/Carlos_Sainz_jr.JPG',
    hamilton:'https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg',
    perez:'https://upload.wikimedia.org/wikipedia/commons/7/7a/Sergio_P%C3%A9rez_2019_%28cropped%29.jpg',
    russell:'https://upload.wikimedia.org/wikipedia/commons/7/71/George_Russell%2C_Silverstone_2021_%2851350033659%29_%28cropped%29.jpg',
    alonso:'https://upload.wikimedia.org/wikipedia/commons/f/ff/Fernando_Alonso1.jpg',
    stroll:'https://upload.wikimedia.org/wikipedia/commons/8/88/Lance_Stroll_2017_Malaysia_1.jpg',
    hulkenberg:'https://upload.wikimedia.org/wikipedia/commons/2/24/Nico_Hulkenberg_2017_Malaysia.jpg',
    tsunoda:'https://upload.wikimedia.org/wikipedia/commons/f/f7/FIA_F1_Austria_2023_Yuki_Tsunoda.jpg',
    ricciardo:'https://upload.wikimedia.org/wikipedia/commons/c/c7/Daniel_Ricciardo.JPG',
    bearman:'https://upload.wikimedia.org/wikipedia/commons/c/ca/Ollie_Bearman_Austria_2022.jpg',
    gasly:'https://upload.wikimedia.org/wikipedia/commons/7/77/Pierre_Gasly_2019.jpg',
    kevin_magnussen:'https://upload.wikimedia.org/wikipedia/commons/b/b3/Kevin_Magnussen_2012-1.JPG',
    ocon:'https://upload.wikimedia.org/wikipedia/commons/4/4e/Esteban_Ocon.jpg',
    albon:'https://upload.wikimedia.org/wikipedia/commons/1/17/Alex_Albon.jpg',
    zhou:'https://upload.wikimedia.org/wikipedia/commons/e/ed/Zhou_Guanyu_at_the_2022_Austrian_Grand_Prix.jpg',
    sargeant:'https://upload.wikimedia.org/wikipedia/commons/8/86/FIA_F1_Austria_2024_Nr._2_Sargeant.jpg',
    bottas:'https://upload.wikimedia.org/wikipedia/commons/9/9a/2019_Formula_One_tests_Barcelona%2C_Bottas_%2847200028912%29.jpg',
    lawson:'https://upload.wikimedia.org/wikipedia/commons/5/5e/Liam_Lawson_Austria_2022.jpg',
    de_vries:'https://upload.wikimedia.org/wikipedia/commons/0/09/Nyck_de_Vries_IAA_2019.jpg',
};

const DriverDetail = () => {
  const { driverId } = useParams();
  const [driver, setDriver] = useState(null);

  useEffect(() => {
    axios.get(`https://ergast.com/api/f1/2023/drivers/${driverId}.json`)
      .then(response => setDriver(response.data.MRData.DriverTable.Drivers[0]))
      .catch(error => console.error('Error fetching driver details:', error));
  }, [driverId]);

  if (!driver) {
    return <div>Loading...</div>;
  }

  return (
    <div className="driver-detail">
      <img
        src={driverImages[driver.driverId] || `https://via.placeholder.com/150?text=${driver.givenName}+${driver.familyName}`}
        alt={`${driver.givenName} ${driver.familyName}`}
      />
      <h1>{driver.givenName} {driver.familyName}</h1>
      <p>Nationality: {driver.nationality}</p>
      <p>Date of Birth: {driver.dateOfBirth}</p>
      <a href={driver.url} target="_blank" rel="noopener noreferrer">More details</a>
    </div>
  );
};

export default DriverDetail;
