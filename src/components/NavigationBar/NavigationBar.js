//--------------------------------------------------------------------------------------//
//                                 NavigationBar.js                                     //
//--------------------------------------------------------------------------------------//

// Libraries & Files
import React, { useState } from 'react';   // Import useState hook from React
// Removed react-scroll Link import since we are replacing it with <a> tags and manual handling
import classNames from 'classnames';       // Import classNames to dynamically set class names
import './NavigationBar.css';              // Import CSS for the navigation bar

// Assuming you have a navigation array or similar structure
const navigation = [
    { name: 'Home', href: 'home' },
    { name: 'About', href: 'about' },
    { name: 'Skills', href: 'skills' },
    { name: 'Projects', href: 'projects' },
    { name: 'Contact', href: 'contact' },
];

// Helper function for smooth scrolling
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
            <div className="navbar__name">
                <>Kevin Cendana</>
            </div>
            <div className="navbar__list-wrapper">
                {/* Dynamically generate navigation links */}
                <ul className="navbar__list">
                    {navigation.map((item) => (
                        <li key={item.name} className={`borderXwidth ${getActiveClass(item.href)}`}>
                            <a
                                href={`#${item.href}`}
                                onClick={(e) => handleSmoothScroll(e, item.href)}
                                className={item.name === 'Contact' ? 'nav-contact' : ''}
                            >
                                {item.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}

export default NavigationBar;
