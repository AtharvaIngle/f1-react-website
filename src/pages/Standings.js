// src/pages/Standings.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Standings.css';

const Standings = () => {
    const [standings, setStandings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStandings = async () => {
            try {
                const response = await axios.get(
                    'https://ergast.com/api/f1/current/driverStandings.json'
                );
                setStandings(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
            } catch (error) {
                console.error('Error fetching standings:', error);
                setError('Failed to fetch standings.');
            } finally {
                setLoading(false);
            }
        };

        fetchStandings();
    }, []);

    if (loading) return <div className="standings-loading">Loading...</div>;
    if (error) return <div className="standings-error">{error}</div>;
    if (standings.length === 0) return <div className="standings-empty">No standings available.</div>;

    return (
        <div className="standings-container">
            <h2 className="standings-title">Current Driver Standings</h2>
            <table className="standings-table">
                <thead>
                    <tr>
                        <th>Position</th>
                        <th>Driver</th>
                        <th>Team</th>
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody>
                    {standings.map((driver, index) => (
                        <tr key={index}>
                            <td>{driver.position}</td>
                            <td>{`${driver.Driver.givenName} ${driver.Driver.familyName}`}</td>
                            <td>{driver.Constructors.map(c => c.name).join(', ')}</td>
                            <td>{driver.points}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Standings;
