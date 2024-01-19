//--------------------------------------------------------------------------------------//
//                                         Home                                         //
//--------------------------------------------------------------------------------------//
// Credit for rotating text animation: https://www.npmjs.com/package/react-rotating-text?activeTab=readme

// Libraries & Files
import useInView from '../../hooks/useInView';      // Import custom hook to check if an element is in the viewport
import ReactRotatingText from './RotatingText';     // Import rotating text component
import React, { useRef } from 'react';   // Import React features
import classNames from 'classnames';                // Import classnames for dynamic className assignment
import { useDarkMode } from '../../shared/DarkModeToggle/DarkModeContext'; // Import custom hook for dark mode state
import './Home.css';          // Import CSS for Home component
import '../NavigationBar/NavigationBar.css';       // Import CSS for NavigationBar component
import '../../normalize.css'; // Import normalize.css for CSS resets

// Images
import normalImage from '../../images/self-image.png';         // Import normal mode image of me
import darkImage from '../../images/self-image-dark-mode.png'; // Import dark mode image of me

function Home() {
    // States for dark mode & checking if Home is in view
    const { isDarkMode } = useDarkMode();          // Get dark mode state
    const homeRef = useRef(null);                  // Create ref for home section
    const isHomeInView = useInView                 // Check if home section is in view
        (homeRef, { sectionName: 'home' });        

    // Determine the class for text container based on states
    const textContainerClass = classNames({      
        'home__text-container': true,
        'animate-home-text-container': isHomeInView,
        'dark-mode': isDarkMode 
    });

    // Render the Home section
    return (
        <section className = "home" id = "home" ref={homeRef}>
            {/* Left side of the Home section w/ my name & rotating titles */}
            <div className="home__left">
                <div className={textContainerClass}>
                    <div className="block-wrapper">
                        {/* Text w/ my name & rotating titles */}
                        <h1 className="home__text-name">Kevin Cendana</h1>
                        <p className="home__text-alias">
                            <ReactRotatingText items={[
                                'Computer Science Student',
                                'Web Developer',
                                'Software Engineer']} />
                        </p>
                    </div>
                </div>
            </div>
            {/* Right side of the Home section w/ drawing of me, darkens on dark mode*/}
            <img src={isDarkMode ? darkImage : normalImage} 
                alt='Kevin Cendana Drawing' 
                className = {`home-image ${isHomeInView ? 'animate-home-image' : ''}`} 
                draggable = "false">
            </img>
        </section>
    );
}

export default Home;
