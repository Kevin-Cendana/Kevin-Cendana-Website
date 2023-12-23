//--------------------------------------------------------------------------------------//
//                                        About                                         //
//--------------------------------------------------------------------------------------//

// Import necessary libraries and components from React and other files
import React, { useEffect, useState, useRef } from 'react'; // Import React and hooks
import TypingDots from './TypingDots';                      // Import the TypingDots component
import useInView from '../../hooks/useInView';              // Import the custom hook useInView
import './About.css';         // Import CSS for the About component
import '../../App.css';       // Import the main app-wide CSS
import './TypingDots.css';    // Import CSS for TypingDots component
import './PolaroidStack.css'; // Import CSS for PolaroidStack, with credit to the original author
import '../../normalize.css'; // Import normalize.css for CSS resets

// About Section
function About() {
    // Variables
    const aboutRef = useRef(null);        // Create a ref to track the About section
    const isInView = useInView(aboutRef); // Use custom hook to check if About is in view

    // Render the About section
    return (
        <section className="about" ref={aboutRef}> 
            <h1 className="about__header">
                About Me
            </h1>
            <div className="about__wrapper"> 
                <div className="about__left"> 
                    <div className="about__polaroid-wrapper">
                        {/* PolaroidStack.css for the image*/} 
                        {/* Credit: https://codepen.io/havardob/pen/jOwrXaJ */}
                        <div className="polaroid__stack"> 
                            <div className="polaroid__card"> 
                                <div className="polaroid__image"> 
                                    <div className="about-image-container"></div>
                                </div>
                                <h3 className="polaroid__caption"> kevin & emma :)</h3> 
                            </div>
                        </div>
                    </div>
                </div>
                <div className="about__right"> 
                    <div className="about__typing-dots-wrapper">
                        <TypingDots startAnimation={isInView}/>
                    </div>
                </div>
            </div>
        </section>
    );
}

// Export the About component to be used in other parts of the app
export default About;
