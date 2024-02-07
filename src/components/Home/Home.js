//--------------------------------------------------------------------------------------//
//                                         Home                                         //
//--------------------------------------------------------------------------------------//
// Credit for rotating text animation: https://www.npmjs.com/package/react-rotating-text?activeTab=readme

// Libraries & Files
import useInView from '../../hooks/useInView';      // Import custom hook to check if an element is in the viewport
import ReactRotatingText from './RotatingText';     // Import rotating text component
import React, { useRef, useState, useEffect } from 'react';    // Import React features
import classNames from 'classnames';                // Import classnames for dynamic className assignment
import { useDarkMode } from '../../shared/DarkModeToggle/DarkModeContext'; // Import custom hook for dark mode state
import './Home.css';                                // Import CSS for Home component
import '../NavigationBar/NavigationBar.css';        // Import CSS for NavigationBar component
import '../../normalize.css';                       // Import normalize.css for CSS resets

// Images
import lightModeHomeImagePng from '../../images/home_images/self-image.png';         // Import normal mode image of me
import darkModeHomeImagePng from '../../images/home_images/self-image-dark-mode.png'; // Import dark mode image of me
import lightModeHomeImageWebp from '../../images/home_images/self-image.webp';        // Import normal mode image of me in webp format
import darkModeHomeImageWebp from '../../images/home_images/self-image-dark-mode.webp';// Import dark mode image of me in webp format

function Home() {
    // States for dark mode & checking if Home is in view
    const { isDarkMode } = useDarkMode();          // Get dark mode state
    const homeRef = useRef(null);                  // Create ref for home section
    const isHomeInView = useInView                 // Check if home section is in view
        (homeRef, { sectionName: 'home' });        

    // State for image source - changes based on dark mode state
    const [imageSrc, setImageSrc] = useState(isDarkMode ? darkModeHomeImageWebp : lightModeHomeImageWebp);
    
    // Update imageSrc when isDarkMode changes
    useEffect(() => {
        setImageSrc(isDarkMode ? darkModeHomeImageWebp : lightModeHomeImageWebp);
    }, [isDarkMode]); // Dependency array, re-run effect when isDarkMode changes

    // Fallback to PNG if WebP is not supported
    const handleError = () => {
        setImageSrc(isDarkMode ? darkModeHomeImagePng : lightModeHomeImagePng);
    };

    

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
                                'Software Engineer',
                                'Web Developer',
                                'Computer Science Student',
                                ]} />
                        </p>
                    </div>
                </div>
            </div>
            {/* Right side of the Home section w/ drawing of me, darkens on dark mode*/}
            <img src={imageSrc} 
                onError={handleError} 
                alt='Kevin Cendana Drawing' 
                className={`home-image ${isHomeInView ? 'animate-home-image' : ''}`} 
                draggable="false">
            </img>
        </section>
    );
}

export default Home;
