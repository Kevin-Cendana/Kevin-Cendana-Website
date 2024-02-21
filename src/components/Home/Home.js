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
import lightModeHomeImagePng from '../../images/home_images/kc-no-bg.png';         // Import normal mode image of me
import lightModeHomeImageWebp from '../../images/home_images/kc-no-bg.webp';        // Import normal mode image of me in webp format

function Home() {
    // States: Dark mode, check if Home in view, img based on dark mode, & webp support
    const { isDarkMode } = useDarkMode();          // Get dark mode state
    const homeRef = useRef(null);                  // Create ref for home section
    const isHomeInView = useInView(homeRef, { sectionName: 'home' }); // Check if home section is in view
    const [imageSrc, setImageSrc] = useState(lightModeHomeImageWebp);
    const [supportsWebP, setSupportsWebP] = useState(false); // Check if browser supports WebP

    // On error: Set imageSrc to PNG if WebP fails to load
    const handleError = () => {
        setImageSrc(lightModeHomeImagePng);
    }

    // On mount: Update imageSrc when isDarkMode changes
    useEffect(() => {
        setImageSrc(lightModeHomeImageWebp);
    }, [isDarkMode]); // Dependency array, re-run effect when isDarkMode changes

    // On mount: Detect WebP support
    useEffect(() => {
        const testWebP = new Image();
        testWebP.onload = testWebP.onerror = function () {
            setSupportsWebP(testWebP.height === 2);
        };
        testWebP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    }, []);
    const preloadImageSrc = supportsWebP ? lightModeHomeImageWebp : lightModeHomeImagePng; // Preload WebP or PNG based on browser support 

    // On mount: Dynamically preload images using a side effect
    useEffect(() => {
        if (preloadImageSrc) {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = preloadImageSrc;
            document.head.appendChild(link);

            return () => document.head.removeChild(link);
        }
    }, [preloadImageSrc]);


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
