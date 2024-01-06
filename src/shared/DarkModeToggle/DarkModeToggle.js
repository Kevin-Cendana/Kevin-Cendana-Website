//--------------------------------------------------------------------------------------//
//                                  DarkModeToggle.js                                   //
//--------------------------------------------------------------------------------------//
import React, { useEffect, useCallback } from 'react'; 
import './DarkModeToggle.css'; 
import { useDarkMode } from './DarkModeContext';

function DarkModeToggle() {
    const { isDarkMode, setIsDarkMode } = useDarkMode();

    // Define CSS selectors for dark mode elements
    const darkModeSelectors = `
        html, body, p, div, label, section, span, nav, Link, ul, h1, h2, a, button,
        .animate-header, .about, .background, .home, .home-image, .navbar, .navbar__list, 
        .navbar__link, .skills, .slider, .slider:before, .polaroid__caption, .resume, .contact
    `;

    const toggleDarkMode = useCallback((value) => {
        document.body.classList.toggle('dark-mode', value);
        document.querySelectorAll(darkModeSelectors).forEach(el => {
            el.classList.toggle('dark-mode', value);
        });
    }, [darkModeSelectors]);

    // Apply dark mode on component mount and when isDarkMode changes
    useEffect(() => {
        toggleDarkMode(isDarkMode);
    }, [isDarkMode, toggleDarkMode]);

    const handleToggleChange = () => {
        setIsDarkMode(!isDarkMode); // This will update the global state
    };

    return (
        <input 
            type="checkbox" 
            id="dark-mode" 
            checked={isDarkMode} 
            onChange={handleToggleChange} 
        />
    );
}

export default DarkModeToggle;