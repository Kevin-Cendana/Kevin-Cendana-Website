//--------------------------------------------------------------------------------------//
//                                  DarkModeToggle.js                                   //
//--------------------------------------------------------------------------------------//
import React, { useState, useEffect, useCallback } from 'react'; 
import './DarkModeToggle.css'; 
import { getCookie, setCookie } from '../../CookieUtils'; 
import { useLocation } from 'react-router-dom'; 

// Define CSS selectors for dark mode elements
const darkModeSelectors = `
    html, body, p, div, label, section, span, nav, Link, ul, h1, h2, a, button,
    .background, .navbar, .navbar__list, .navbar__link, .skills,
    .slider, .slider:before, .polaroid__caption, .resume, .contact
`;

function DarkModeToggle() {
    const location = useLocation();     
    const getStoredDarkMode = () => getCookie('dark-mode') === 'true'; 
    const [isDarkMode, setIsDarkMode] = useState(getStoredDarkMode()); // Initialize based on cookie


    const storeDarkMode = (value) => setCookie('dark-mode', value, 365);

    const toggleDarkMode = useCallback((value) => {
        document.body.classList.toggle('dark-mode', value);
        document.querySelectorAll(darkModeSelectors).forEach(el => {
            el.classList.toggle('dark-mode', value);
        });
        storeDarkMode(value);
    }, []); 

        // Apply dark mode on component mount
        useEffect(() => {
            toggleDarkMode(isDarkMode);
        }, [location, isDarkMode, toggleDarkMode]);
    

    const handleToggleChange = () => {
        setIsDarkMode(!isDarkMode);
    }

    return (
        <input type="checkbox" id="dark-mode" checked={isDarkMode} onChange={handleToggleChange} /> 
    );
}

export default DarkModeToggle;
