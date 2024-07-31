import React, { useState, useEffect } from 'react';
import { fetchDrivers, fetchRacetracks } from './f1ApiService';
import './Home.css';

const Home = () => {
  const [drivers, setDrivers] = useState([]);
  const [racetracks, setRacetracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const driverImages = {
    norris: 'https://upload.wikimedia.org/wikipedia/commons/9/9c/Lando_Norris%2C_British_GP_2022_%2852382611003%29_%28cropped%29.jpg',
    max_verstappen: 'https://upload.wikimedia.org/wikipedia/commons/7/7d/Max_Verstappen_2017_Malaysia_3_%28cropped%29.jpg',
    leclerc:'https://upload.wikimedia.org/wikipedia/commons/6/62/F12019_Leclerc_Schloss_Gabelhofen.jpg',
    piastri:'https://upload.wikimedia.org/wikipedia/commons/c/ce/Oscar_Piastri_Spa_%28cropped%29.jpg',
    sainz:'https://upload.wikimedia.org/wikipedia/commons/7/76/Carlos_Sainz_jr.JPG',
    hamilton:'https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg',
  };

  
  useEffect(() => {
    const getData = async () => {
      try {
        const driversData = await fetchDrivers();
        setDrivers(driversData);

        const racetracksData = await fetchRacetracks();
        setRacetracks(racetracksData);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="home-container">
      <div className="fade-in">
        <h1>Welcome to the F1 Website</h1>
        <p>Explore the world of Formula 1 racing!</p>
        

        <section>
          <h2>Top Drivers</h2>
          <div className="drivers">
            {drivers.map(driver => (
              <div key={driver.id} className="driver-card">
                <img 
                 src={driverImages[driver.id] || `https://via.placeholder.com/150?text=${driver.givenName}+${driver.familyName}`}
                 alt={`${driver.givenName} ${driver.familyName}`}
              
                />
                <p>{driver.givenName} {driver.familyName}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2>Famous Racetraks</h2>
          <div className="racetracks">
            {racetracks.slice(0, 5).map(track => (
              <div key={track.id} className="track-card">
                <img 
                  src={track.image || `https://via.placeholder.com/150?text=${track.name}`} 
                  alt={track.name} 
                />
                <p>{track.name} - {track.location}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
