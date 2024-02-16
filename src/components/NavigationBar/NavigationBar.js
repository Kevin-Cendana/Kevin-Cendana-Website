//--------------------------------------------------------------------------------------//
//                                 NavigationBar.js                                     //
//--------------------------------------------------------------------------------------//

// Libaries & Files
import React, { useState } from 'react';   // Import useState hook from React
import { Link } from 'react-scroll';       // Import Link from react-scroll for smooth scrolling
import classNames from 'classnames';       // Import classNames to dynamically set class names
import './NavigationBar.css';              // Import CSS for the navigation bar
import DarkModeToggle from '../../shared/DarkModeToggle/DarkModeToggle'; // Import the DarkModeToggle component

// Render the Navigation Bar
function NavigationBar() {
    // State to track which section is active
    const [activeSection, setActiveSection] = useState('');

    // Function to set active section and update active state
    const onSetActive = (section) => {
        setActiveSection(section);
    };

    // Function to get active class for section
    const getActiveClass = (section) => {
        return classNames({ 'navbar__link-active': activeSection === section });
    };

    // Return the Navigation Bar
    return (
        <nav className="navbar" role = "navigation">
            <div className="navbar__list-wrapper">
                {/* List of Navigation Bar sections to go to. "Offset" arg changes the position they are detected. */}
                <ul className="navbar__list">
                    <li className={`borderXwidth ${getActiveClass('home')}`}>
                        <Link to="home" offset={0} spy={true} onSetActive={() => onSetActive('home')}>Home</Link>
                    </li>
                    <li className={`borderXwidth ${getActiveClass('about')}`}>
                        <Link to="about" offset={-270} spy={true} onSetActive={() => onSetActive('about')}>About</Link>
                    </li>
                    <li className={`borderXwidth ${getActiveClass('skills')}`}>
                        <Link to="skills" offset={-280} spy={true} onSetActive={() => onSetActive('skills')}>Skills</Link>
                    </li>
                    <li className={`borderXwidth ${getActiveClass('projects')}`}>
                        <Link to="projects" offset={-260} spy={true} onSetActive={() => onSetActive('projects')}>Projects</Link>
                    </li>
                    <li className={`borderXwidth ${getActiveClass('contact')}`}>
                        <Link to="contact" offset={-420} spy={true} onSetActive={() => onSetActive('contact')}>Contact</Link>
                    </li>
                </ul>
            </div>

            {/* Items in the top right of the nav bar: Social Media icons & Dark Mode switch */}
            <div className="top-right-items">
            <a href="https://docs.google.com/document/d/1xiAtzAXNMSw3ZkajAZaag-O40Fxn4iWoJ1nj-sb5YCA/edit?usp=sharing" target="_blank" className="github-logo-link" rel="noopener noreferrer">
                <div className = "navbar-icon csv-icon"></div>
            </a>
            <a href="https://linkedin.com/in/kevincendana" target="_blank" className="linkedin-icon-link" rel="noopener noreferrer">
            <div className = "navbar-icon linkedin-icon"></div>
            </a>
            <a href="https://github.com/KevCendana" target="_blank" className="github-icon-link" rel="noopener noreferrer">
            <div className = "navbar-icon github-icon"></div>
            </a>
                <div className="toggle__container">
                    <label className="switch">
                        <DarkModeToggle />
                        <span className="slider round"></span>
                    </label>
                </div>
            </div>
        </nav>
    );
}

export default NavigationBar;
