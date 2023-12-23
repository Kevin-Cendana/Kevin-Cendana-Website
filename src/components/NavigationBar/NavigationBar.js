//--------------------------------------------------------------------------------------//
//                                 NavigationBar.js                                     //
//--------------------------------------------------------------------------------------//

import React, { useState } from 'react';
import { Link } from 'react-scroll';
import classNames from 'classnames';
import './NavigationBar.css';
import DarkModeToggle from '../../shared/DarkModeToggle/DarkModeToggle';

function NavigationBar() {
    const [activeSection, setActiveSection] = useState('');

    const onSetActive = (section) => {
        setActiveSection(section);
    };

    const getActiveClass = (section) => {
        return classNames({ 'navbar__link-active': activeSection === section });
    };
    return (
        <nav className="navbar">
            <div className="navbar__list-wrapper">
                <ul className="navbar__list">
                    <Link className={`borderXwidth ${getActiveClass('home')}`} to="home" offset={-59} spy={true} onSetActive={() => onSetActive('home')}>
                        <li>Home</li>
                    </Link>
                    <Link className={`borderXwidth ${getActiveClass('about')}`} to="about" offset={-270} spy={true} onSetActive={() => onSetActive('about')}>
                        <li>About</li>
                    </Link>
                    <Link className={`borderXwidth ${getActiveClass('skills')}`} to="skills" offset={-280} spy={true} onSetActive={() => onSetActive('skills')}>
                        <li>Skills</li>
                    </Link>
                    <Link className={`borderXwidth ${getActiveClass('projects')}`} to="projects" offset={-260} spy={true} onSetActive={() => onSetActive('projects')}>
                        <li>Projects</li>
                    </Link>
                    <Link className={`borderXwidth ${getActiveClass('resume-contact')}`} to="resume-contact" spy={true} onSetActive={() => onSetActive('resume-contact')}>
                        <li>Resume</li>
                    </Link>
                    <Link className={`borderXwidth ${getActiveClass('resume-contact')}`} to="resume-contact" spy={true} onSetActive={() => onSetActive('resume-contact')}>
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
