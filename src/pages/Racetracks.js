import React, { useState, useEffect } from 'react';
import { fetchRacetracks } from './f1ApiService';
// import driverImages from './driverImages';


const Racetracks = () => {
  
  const [racetracks, setRacetracks] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const getData = async () => {
      try {
        

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
      <h1>F1 RaceTracks</h1>
    <p>Explore the iconic circuits where champions are made.</p>

    <section>
      <h2>Famous Racetracks</h2>
          <div className="racetracks">
            {racetracks.map(track => (
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

export default Racetracks;
