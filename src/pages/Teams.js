// src/pages/Teams.js
import React, { useState, useEffect } from 'react';
import { fetchTeams } from './f1ApiService'; // Correct import path
import './Teams.css';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const teamsData = await fetchTeams();
        setTeams(teamsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching teams:', error);
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="teams-container">
      <h1>F1 Teams</h1>
      <div className="teams">
        {teams.map(team => (
          <div 
            key={team.id} 
            className={`team-card origin-color`} 
            style={{ '--team-origin-color': team.originColor || '#f0f0f0' }}
            onClick={() => window.location.href = `/teams/${team.id}`}
          >
            <img 
              src={team.logo || `https://via.placeholder.com/150?text=${team.name}`} 
              alt={team.name} 
            />
            <h3>{team.name}</h3>
            <p>{team.originCountry}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teams;
