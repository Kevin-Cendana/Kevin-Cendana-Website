//--------------------------------------------------------------------------------------//
//                                        About                                         //
//--------------------------------------------------------------------------------------//


import React, { useEffect, useState } from 'react';
import TypingDots from './TypingDots';
import './About.css';
import '../App.css';
import './TypingDots.css';
import './PolaroidStack.css'; // PolaroidStack.css credit: https://codepen.io/havardob/pen/jOwrXaJ
import '../normalize.css';


function About() {
    const [isInView, setIsInView] = useState(false); // State to checkk if About section is in view

    // Observer to check if About section is in view
    // Typing Dots animation will start when About section is in view
    useEffect(() => {
        const aboutElement = document.querySelector('.about');
        const observer = new IntersectionObserver(
            (entries) => {
                // If about section is in view, set isInView to true
                if (entries[0].isIntersecting) {
                    setIsInView(true);
                }
            },
            { threshold: 0.6 } // 70% of the element should be visible
        );
    
        observer.observe(aboutElement);
    
        // Cleanup function to unobserve when component unmounts
        return () => observer.unobserve(aboutElement);
    }, []);
    
    return (
        <div className="about">
            <section className="about__left animated">
                <div className="about__polaroid-wrapper">
                    <div class="stack">
                        <div class="card">
                            <div class="image">
                            <div className="about__left-image-container"> </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="about__text-container">
                    <h1 className = "about__text-name">Kevin
                    Cendana</h1>
                    <p className = "about__text-alias">Computer Science Student</p>
                </div>
            </section>
            <section className  = "about__right">
                <div className  = "about__right-container">
                    <TypingDots startAnimation={isInView}/>
                </div>
            </section>
        </div>
    );
}

export default About;
