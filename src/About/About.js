//--------------------------------------------------------------------------------------//
//                                        About                                         //
//--------------------------------------------------------------------------------------//


import React, { useEffect } from 'react';
import TypingDots from './TypingDots';
import './About.css';
import '../App.css';
import './TypingDots.css';
import '../normalize.css';


function About() {
    return (
        <div className="about">
            About (Work in Progress!)
            <section className="about__left animated">
                <div className="about__left-image-container"> </div>
                <div className="about__text-container">
                    <h1 className = "about__text-name">Kevin
                    Cendana</h1>
                    <p className = "about__text-alias">Computer Science Student</p>
                </div>
            </section>
            <section className  = "about__right">
                <div className  = "about__right-container">
                    <TypingDots/>
                </div>
            </section>
        </div>
    );
}

export default About;
