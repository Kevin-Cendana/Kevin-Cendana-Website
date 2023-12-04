//--------------------------------------------------------------------------------------//
//                                         Home                                         //
//--------------------------------------------------------------------------------------//
// Credit for rotating text animation: https://www.npmjs.com/package/react-rotating-text?activeTab=readme
import ReactRotatingText from './RotatingText';
import React, { useState, useEffect } from 'react';
import './Home.css';
import '../normalize.css';

function Home() {

    // Trigger animations when the page loads
    useEffect(() => {
        const imageContainer = document.querySelector('.home-image-container');
        imageContainer.classList.add('start-animation');
    }, []);
    
    return (
        <div className = "home " id = "home">
            <div className="home__left">
            <div className="home__text-container">
                <div className="block-wrapper">
                    <h1 className="home__text-name">Kevin Cendana</h1>
                    <p className="home__text-alias">
                        <ReactRotatingText items={[
                            'Computer Science Student',
                            'Web Developer',
                            'Enthusiastic Programmer']} />
                    </p>
                </div>
            </div>
            </div>
            <div className="home__right">
                <div className="home-image-container">

                </div>
            </div>

        </div>
    );
}

export default Home;
