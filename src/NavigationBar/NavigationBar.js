//--------------------------------------------------------------------------------------//
//                                 NavigationBar.js                                     //
//--------------------------------------------------------------------------------------//

import React, { useState } from 'react';
import { Link } from 'react-scroll';
import classNames from 'classnames';
import './NavigationBar.css';
import DarkModeToggle from './DarkModeToggle';

function NavigationBar() {
    const [activeSection] = useState('');

    // Helper function to apply active class conditionally
    const getActiveClass = (section) => {
        return classNames({ 'navbar__link-active': activeSection === section });
    };

    return (
        <nav className="navbar">
            <div className="navbar__list-wrapper">
                <ul className="navbar__list">
                    <Link className={getActiveClass('home')} to="home" spy={true}>
                        <li>Home</li>
                    </Link>
                    <Link className={getActiveClass('about')} to="about" offset={-310} spy={true}>
                        <li>About</li>
                    </Link>
                    <Link className={getActiveClass('projects')} to="projects" offset={-150} spy={true}>
                        <li>Projects</li>
                    </Link>
                    <Link className={getActiveClass('contact')} to="contact" spy={true}>
                        <li>Contact</li>
                    </Link>
                </ul>
            </div>

            <div className="top-right-items">
            <a href="https://github.com/KevCendana" target="_blank" className="github-logo-link"rel="noreferrer">
                <div className = "github-logo"></div>
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
