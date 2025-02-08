//--------------------------------------------------------------------------------------//
//                                       About.js                                        //
//--------------------------------------------------------------------------------------//

// Libraries & Files
import React, { useRef, useEffect, useState } from 'react'; // Import React and the useRef hook
import classNames from 'classnames';   // Import classNames for conditional class naming
import useInView from '../../hooks/useInView'; // Custom hook to check if an element is in view
import { useDarkMode } from '../../shared/DarkModeToggle/DarkModeContext'; // Context hook for dark mode
import './About.css';         // Import CSS for this About component
import '../../App.css';       // Import general App CSS
import '../../AppColors.css';
import '../../normalize.css'; // Import CSS to normalize styles across browsers
import AboutPolaroidImageWebP from '../../images/about_images/kevin-art.webp'; // Import polaroid image
import AboutPolaroidImagePNG from '../../images/about_images/kevin-art.png'; // Import polaroid image
import ContactMeButton from '../../shared/ContactMeButton';
import ViewResumeButton from '../../shared/ViewResumeButton';

// About Section Component
function About() {
    const { isDarkMode } = useDarkMode();       // Retrieve dark mode state
    const aboutRef = useRef(null);              // Reference for the about section
    const [supportsWebP, setSupportsWebP] = useState(false); // Check if browser supports WebP
    const [imageLoaded, setImageLoaded] = useState(false);   // Check if image is loaded

    // Check if different parts of the about section are in view
    const startAnimationAbout = useInView(aboutRef, {threshold: [0.25], sectionName: 'about'}) && imageLoaded;

    // CSS Class Names for the About section
    const headerClass = classNames({
        'about__header': true,               // Base class for the header
        'animate-header': startAnimationAbout,     // Add animation if about section is in view
        'section-header': true,              // Base class for the section header
        'dark-mode': isDarkMode              // Apply dark mode styling if enabled
    });
    const subheaderClass = classNames({
        'about__subheader': true,             // Base class for the subheader
        'animate-subheader': startAnimationAbout,  // Add animation if about section is in view
        'dark-mode': isDarkMode              // Apply dark mode styling if enabled
    });
    const aboutLeftClass = classNames({
        'about__left': true,               // Base class for the polaroid wrapper
        'animate-about__left': startAnimationAbout,  // Add animation if polaroid is in view
        'dark-mode': isDarkMode                        // Apply dark mode styling if enabled
    });
    const aboutRightClass = classNames({
        'about__right': true,              // Base class for the text wrapper
        'animate-about__right': startAnimationAbout, // Add animation if text is in view
        'dark-mode': isDarkMode             // Apply dark mode styling if enabled
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
            
            {/* About Content */}
                {/* Left Side with polaroid image */}
                <div className={aboutLeftClass}>
                    <div className="about__image-container">
                        <img src={supportsWebP ? AboutPolaroidImageWebP : AboutPolaroidImagePNG} alt="Kevin" draggable="false"/>
                    </div>
                </div>
                {/* Right Side with Typing Dots Animation */}
                <div className={aboutRightClass}>
                    <h1 className={headerClass}>ABOUT ME</h1>
                    <h2 className={subheaderClass}>Hello! My name is Kevin.</h2>
                    <p>I'm a software engineer that graduated from California State University, Sacramento. I'm currently working as a front-end developer, as I love the visual aspect of seeing projects come to life. In my free time, I still love to code projects for fun, as well as play games and grab boba with friends. Thank you for visiting my website!</p>
                    <div class="button-wrapper">
                        <ContactMeButton />
                        <ViewResumeButton />
                    </div>
                </div>
        </section>
    );
}

export default About;
