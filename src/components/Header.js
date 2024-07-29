import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header>
      <nav>
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/drivers">Drivers</NavLink>
        <NavLink to="/racetracks">Racetracks</NavLink>
        <NavLink to="/teams">Teams</NavLink>
        <NavLink to="/game">Game</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/news">News</NavLink>
        <NavLink to="/standings">Standings</NavLink>
        <NavLink to="/videos">Videos</NavLink>
      </nav>
      {/* <div className="car-container">
        <img src="/car.png" alt="Moving Car" className="moving-car" />
      </div> */}
    </header>
  );
};

export default Header;
