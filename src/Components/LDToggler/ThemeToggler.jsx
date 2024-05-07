import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import './Toggle.css';
import { toggleTheme } from '../../Redux/Slices/themeSlice';

const ThemeToggler = () => {

    const dispatch = useDispatch();
    const { theme } = useSelector(state => state.theme);

    const handleToggle = () => {
        dispatch(toggleTheme());
    };

    return (
        <div>
            <input
                type="checkbox"
                className="checkbox"
                id="checkbox"
                checked={theme === 'dark'}
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
