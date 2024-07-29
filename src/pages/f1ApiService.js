// src/f1ApiService.js

import axios from 'axios';

const API_BASE_URL = 'https://v1.formula-1.api-sports.io';
const API_KEY = '83936e053d33798e4d38cfbb15d8e6a8';  

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'x-rapidapi-key': API_KEY,
    'x-rapidapi-host': 'v1.formula-1.api-sports.io',
  },
});


export const fetchDrivers = async () => {
  try {
    const response = await axios.get('https://ergast.com/api/f1/current/driverStandings.json');
    const drivers = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    const top5Drivers = drivers.slice(0, 5).map(driver => ({
      id: driver.Driver.driverId,
      givenName: driver.Driver.givenName,
      familyName: driver.Driver.familyName,
      name: `${driver.Driver.givenName} ${driver.Driver.familyName}`,
     
      image: `https://via.placeholder.com/150?text=${driver.Driver.givenName}+${driver.Driver.familyName}`
    }));
    return top5Drivers;
  } catch (error) {
    console.error('Error fetching drivers:', error);
    throw error;
  }
};

export const fetchRacetracks = async () => {
  try {
    const response = await api.get('/circuits');
    return response.data.response;
  } catch (error) {
    console.error('Error fetching racetracks:', error);
    throw error;
  }
};
export const fetchTeams = async () => {
  try {
    const response = await api.get('/teams');
    return response.data.response;
  } catch (error) {
    console.error('Error fetching teams:', error);
    throw error;
  }
};
