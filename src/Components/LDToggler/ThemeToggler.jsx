import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import './Toggle.css'; 

const ThemeToggler = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
  };
  console.log(isDarkMode)

  return (
    <div>
      <input
        type="checkbox"
        className="checkbox"
        id="checkbox"
        checked={isDarkMode}
        onChange={handleToggle}
      />
      <label htmlFor="checkbox" className="checkbox-label">
        <FontAwesomeIcon icon={faMoon} className="moon-icon" />
        <FontAwesomeIcon icon={faSun} className="sun-icon" />
        <span className="ball"></span>
      </label>
    </div>
  );
};

export default ThemeToggler;
