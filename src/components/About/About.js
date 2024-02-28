//--------------------------------------------------------------------------------------//
//                                       About.js                                        //
//--------------------------------------------------------------------------------------//

// Libraries & Files
import React, { useRef, useEffect, useState } from 'react'; // Import React and the useRef hook
import classNames from 'classnames';   // Import classNames for conditional class naming
import TypingDots from './TypingDots'; // Import TypingDots component for typing animation
import useInView from '../../hooks/useInView'; // Custom hook to check if an element is in view
import { useDarkMode } from '../../shared/DarkModeToggle/DarkModeContext'; // Context hook for dark mode
import './About.css';         // Import CSS for this About component
import '../../App.css';       // Import general App CSS
import './TypingDots.css';    // Import CSS for TypingDots component
import '../../normalize.css'; // Import CSS to normalize styles across browsers
import AboutPolaroidImageWebP from '../../images/about_images/kevin_and_emma.webp'; // Import polaroid image
import AboutPolaroidImagePNG from '../../images/about_images/kevin_and_emma.png'; // Import polaroid image

// About Section Component
function About() {
    const { isDarkMode } = useDarkMode();       // Retrieve dark mode state
    const aboutRef = useRef(null);              // Reference for the about section
    const polaroidRef = useRef(null);           // Reference for the polaroid image
    const aboutSpeechBubblesRef = useRef(null); // Reference for speech bubbles section
    const [supportsWebP, setSupportsWebP] = useState(false); // Check if browser supports WebP
    const [imageLoaded, setImageLoaded] = useState(false);   // Check if image is loaded

    // Check if different parts of the about section are in view
    const startAnimationAbout = useInView(aboutRef, {threshold: [0.31], sectionName: 'about'}) && imageLoaded;

    // CSS Class Names for the About section
    const headerClass = classNames({
        'about__header': true,               // Base class for the header
        'animate-header': startAnimationAbout,     // Add animation if about section is in view
        'section-header': true,              // Base class for the section header
        'dark-mode': isDarkMode              // Apply dark mode styling if enabled
    });
    const subheaderClass = classNames({
        'about__subheader': true,            // Base class for the header
        'animate-header': startAnimationAbout,     // Add animation if about section is in view
        'section-subheader': true,           // Base class for the section header
        'dark-mode': isDarkMode              // Apply dark mode styling if enabled
    });
    const polaroidClass = classNames({
        'about__polaroid-wrapper': true,               // Base class for the polaroid wrapper
        'animate-polaroid-wrapper': startAnimationAbout,  // Add animation if polaroid is in view
        'dark-mode': isDarkMode                        // Apply dark mode styling if enabled
    });
    
    // On mount: Detect WebP support
    useEffect(() => {
        const testWebP = new Image();
        testWebP.onload = testWebP.onerror = function () {
            setSupportsWebP(testWebP.height === 2);
        };
        testWebP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    }, []);
    const preloadImageSrc = supportsWebP ? AboutPolaroidImageWebP : AboutPolaroidImagePNG; // Preload WebP or PNG based on browser support 

    // On mount: Dynamically preload images using a side effect
    useEffect(() => {
        if (preloadImageSrc) {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = preloadImageSrc;
            document.head.appendChild(link);

            // Create an image element to check if the image is loaded
            const img = new Image();
            img.onload = () => {
                setImageLoaded(true); // Set to true once image is loaded
            };
            img.src = preloadImageSrc;

            return () => document.head.removeChild(link);
        }
    }, [preloadImageSrc]);

    // Render the About section
    return (
        <section className="about" id = "about" ref={aboutRef}>
            {/* Header */}
            <h1 className={headerClass}>About Me</h1>
            <h2 className={subheaderClass}>
                <i>"There are no strangers here; only friends you haven't yet met."</i>
                <span className="quote-author"> - William Butler</span>
            </h2>
            {/* About Content */}
            <div className="about__wrapper">
                {/* Left Side with polaroid image */}
                <div className="about__left">
                    <div className={polaroidClass} ref={polaroidRef}>
                        {/* Polaroid stack with image and caption */}
                        <div className="polaroid__stack"> 
                            <div className="polaroid__card"> 
                                <div className="polaroid__image"> 
                                    {/* Container for the about image */}
                                    <div className="about-image-container"></div>
                                </div>
                                {/* Caption for the polaroid image */}
                                <h3 className="polaroid__caption"> kevin & emma </h3> 
                            </div>
                        </div>
                    </div>
                </div>
                {/* Right Side with Typing Dots Animation */}
                <div className="about__right">
                    <div className="about__typing-dots-wrapper" ref={aboutSpeechBubblesRef}>
                        {/* TypingDots component: Animates speech bubbles popping up in sequence */}
                        <TypingDots startAnimation={startAnimationAbout}/>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;
