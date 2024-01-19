//--------------------------------------------------------------------------------------//
//                                       About.js                                        //
//--------------------------------------------------------------------------------------//

// Libraries & Files
import React, { useRef } from 'react'; // Import React and the useRef hook
import classNames from 'classnames';   // Import classNames for conditional class naming
import TypingDots from './TypingDots'; // Import TypingDots component for typing animation
import useInView from '../../hooks/useInView'; // Custom hook to check if an element is in view
import { useDarkMode } from '../../shared/DarkModeToggle/DarkModeContext'; // Context hook for dark mode
import './About.css';         // Import CSS for this About component
import '../../App.css';       // Import general App CSS
import './TypingDots.css';    // Import CSS for TypingDots component
import '../../normalize.css'; // Import CSS to normalize styles across browsers

// About Section Component
function About() {
    const { isDarkMode } = useDarkMode();       // Retrieve dark mode state
    const aboutRef = useRef(null);              // Reference for the about section
    const polaroidRef = useRef(null);           // Reference for the polaroid image
    const aboutSpeechBubblesRef = useRef(null); // Reference for speech bubbles section

    // Check if different parts of the about section are in view
    const isAboutInView = useInView(aboutRef, {threshold: [0.31], sectionName: 'about'});
    const isPolaroidInView = useInView(polaroidRef, {threshold: [0.1], sectionName: 'about-polaroid'});
    const isSpeechBubblesInView = useInView(aboutRef, {threshold: [0.3], sectionName: 'about-speech-bubbles'});

    // CSS Class Names for the About section
    const headerClass = classNames({
        'about__header': true,               // Base class for the header
        'animate-header': isAboutInView,     // Add animation if about section is in view
        'section-header': true,              // Base class for the section header
        'dark-mode': isDarkMode              // Apply dark mode styling if enabled
    });
    const subheaderClass = classNames({
        'about__subheader': true,               // Base class for the header
        'animate-header': isAboutInView,     // Add animation if about section is in view
        'section-subheader': true,              // Base class for the section header
        'dark-mode': isDarkMode              // Apply dark mode styling if enabled
    });
    const polaroidClass = classNames({
        'about__polaroid-wrapper': true,               // Base class for the polaroid wrapper
        'animate-polaroid-wrapper': isPolaroidInView,  // Add animation if polaroid is in view
        'dark-mode': isDarkMode                        // Apply dark mode styling if enabled
    });

    // Render the About section
    return (
        <section className="about" ref={aboutRef}>
            {/* Header */}
            <h1 className={headerClass}>About Me</h1>
            <h2 className={subheaderClass}><i>"There are no strangers here; only friends you haven't yet met."</i></h2>
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
                        <TypingDots startAnimation={isSpeechBubblesInView}/>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;
