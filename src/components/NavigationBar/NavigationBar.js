//--------------------------------------------------------------------------------------//
//                                 NavigationBar.js                                     //
//--------------------------------------------------------------------------------------//

// Libraries & Files
import React, { useState } from 'react';   // Import useState hook from React
// Removed react-scroll Link import since we are replacing it with <a> tags and manual handling
import classNames from 'classnames';       // Import classNames to dynamically set class names
import './NavigationBar.css';              // Import CSS for the navigation bar
import DarkModeToggle from '../../shared/DarkModeToggle/DarkModeToggle'; // Import the DarkModeToggle component

// Assuming you have a navigation array or similar structure
const navigation = [
    { name: 'Home', href: 'home' },
    { name: 'About', href: 'about' },
    { name: 'Skills', href: 'skills' },
    { name: 'Projects', href: 'projects' },
    { name: 'Contact', href: 'contact' },
];

// Helper function for smooth scrolling (Consider this as an example, you might need to adjust based on your setup)
const handleSmoothScroll = (e, href) => {
    e.preventDefault(); // Prevent the default anchor behavior

    const targetElement = document.getElementById(href); // Get the target element by ID
    const headerOffset = 32;  // Offset, scroll a little bit further up 

    if (targetElement) {
        const elementPosition = targetElement.offsetTop;
        const offsetPosition = elementPosition - headerOffset;

        // Use window.scrollTo with behavior 'smooth' for a smooth scrolling effect
        window.scrollTo({
            top: offsetPosition, // Scroll to the position above the target element
            behavior: 'smooth',
        });

        // Update the URL hash without reloading the page
        window.history.pushState({}, '', `#${href}`);
    }
};


// Render the Navigation Bar
function NavigationBar() {
    // State to track which section is active
    const [activeSection] = useState('');


    // Function to get active class for section
    const getActiveClass = (section) => {
        return classNames({ 'navbar__link-active': activeSection === section });
    };

    // Return the Navigation Bar
    return (
        <nav className="navbar" role="navigation">
            <div className="navbar__list-wrapper">
                {/* Dynamically generate navigation links */}
                <ul className="navbar__list">
                    {navigation.map((item) => (
                        <li key={item.name} className={`borderXwidth ${getActiveClass(item.href)}`}>
                            <a
                                href={`#${item.href}`}
                                onClick={(e) => handleSmoothScroll(e, item.href)}
                            >
                                {item.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Items in the top right of the nav bar: Social Media icons & Dark Mode switch */}
            <div className="top-right-items">
                {/* Icons: CSV, LinkedIn, GitHub */}
                <a href="https://docs.google.com/document/d/1xiAtzAXNMSw3ZkajAZaag-O40Fxn4iWoJ1nj-sb5YCA/edit?usp=sharing" target="_blank" className="github-logo-link" rel="noopener noreferrer" aria-label="Resume on Google Docs">
                    <div className="navbar-icon csv-icon"></div>
                </a>
                <a href="https://linkedin.com/in/kevincendana" target="_blank" className="linkedin-icon-link" rel="noopener noreferrer" aria-label="LinkedIn Profile">
                    <div className="navbar-icon linkedin-icon"></div>
                </a>
                <a href="https://github.com/KevCendana" target="_blank" className="github-icon-link" rel="noopener noreferrer" aria-label="GitHub Profile">
                    <div className="navbar-icon github-icon"></div>
                </a>

                {/* Dark Mode Toggle */}
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
