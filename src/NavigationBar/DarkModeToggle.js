//--------------------------------------------------------------------------------------//
//                                  DarkModeToggle.js                                   //
//--------------------------------------------------------------------------------------//
/* this file is used to toggle dark mode on and off */

import React, { useState, useEffect } from 'react'; 
import './DarkModeToggle.css'; 
import { getCookie, setCookie } from '../CookieUtils'; 
import { useLocation } from 'react-router-dom'; 

function DarkModeToggle() {
    const location = useLocation();                         // get the page address (AKA location)
    const [isDarkMode, setIsDarkMode] = useState(false);    // keep track of dark mode state
    const getStoredDarkMode = () => getCookie('dark-mode') === 'true'; // get dark mode preference from cookie
    const [transitionDuration, setTransitionDuration] = useState(0.6); // Default to 0.4 seconds


    // initialize dark mode based on cookie
    useEffect(() => {
        setIsDarkMode(getStoredDarkMode());            // initialize dark mode based on cookie
        if (getStoredDarkMode()) toggleDarkMode(true); // apply styles if dark mode
    }, [location]);                                    // rerun effect on route change

    // store dark mode preference in cookie for 1 year 
    const storeDarkMode = (value) => setCookie('dark-mode', value, 365);

    // toggle dark mode css styles on / off
    const toggleDarkMode = (value) => {
        // update body class
        document.body.classList.toggle('dark-mode', value);
        
        // set transition duration for the toggle
        const transitionStyle = `background-color ${transitionDuration}s, transform ${transitionDuration}s`;


    // toggle styles for selected elements and apply transition duration
    const selectors = 'html, body, p, div, label, span, nav, Link, ul, h1, h2, .background, .navbar, .navbar__list, .navbar__link, .slider, .slider:before';
    document.querySelectorAll(selectors).forEach(el => {
        el.classList.toggle('dark-mode', value);
        el.style.transition = transitionStyle;
    });

    // update the cookie
    storeDarkMode(value);
    }

    // function called when checkbox is clicked
    const handleToggleChange = () => {
        const newValue = !isDarkMode; // get the opposite of the current state
        setIsDarkMode(newValue);      // remember this new state
        toggleDarkMode(newValue);     // update to the new opposite state
    }

    // render the checkbox graphic and set its initial state
    return (
        <input type="checkbox" id="dark-mode" checked={isDarkMode} onChange={handleToggleChange} /> 
    );
}

export default DarkModeToggle; 