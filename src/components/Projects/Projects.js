//--------------------------------------------------------------------------------------//
//                                       Projects.js                                       //
//--------------------------------------------------------------------------------------//


import React, { useState, useEffect, useRef } from 'react';
import useInView from '../../hooks/useInView'; 
import Carousel  from './Carousel.tsx'; // Credit: React Round Carousel by scriptex: https://github.com/scriptex/react-round-carousel
import DarkModeToggle from '../../shared/DarkModeToggle/DarkModeToggle.js';
import personal_project1 from '../../images/slideshow_images/maplestory_app.gif';
import personal_project2 from '../../images/slideshow_images/invaded_space.gif';
import personal_project3 from '../../images/slideshow_images/bullseye.png';
import hackathon1 from '../../images/slideshow_images/lyric_link.gif';
import hackathon2 from '../../images/slideshow_images/att_empowher.png';
import hackathon3 from '../../images/slideshow_images/datafest.png';
import './Projects.css';
import './SlideBackgrounds.css';

// Gradient colors for each slide's captions
const rainbowGradient = 'linear-gradient(45deg, #fcb0a9, #a3c9f8, #a6fcb3, #fff2cc)';
const blueGradient = 'linear-gradient(45deg, #e6f9ff, #b3ecff, #80dfff, #4dd2ff, #1ac6ff, #0077be, #004f8c)';
const lightGreenGradient = 'linear-gradient(45deg, #f1f8e9, #dcedc8, #c5e1a5, #aed581, #9ccc65, #8bc34a, #7cb342)';
const orangeGradient = 'linear-gradient(45deg, #ffa500, #ffcc80, #ffdbb5)';
const violetGradient = 'linear-gradient(45deg, #800080, #9400d3, #a020f0)'
const targetGradient = 'radial-gradient(circle at center, #fde4e4 0%, #fde4e4 20%, #ffffff 20%, #ffffff 40%, #fde4e4 40%, #fde4e4 60%, #ffffff 60%, #ffffff 80%, #fde4e4 80%, #fde4e4 100%)';

// Array of slides to use for slideshow pictures
const project_data = [
    { 
        image: hackathon1, 
        title: "Lyric Link",
        description: (
            <span> 
                <a href="https://sachacks.io" target="_blank" rel="noopener noreferrer">SacHacks 2023:</a>{" "}
                A full stack application using Billboard's API to replicate a music forum 
                where people could discuss songs in the current Top 100.
            </span>
        ),
        captions: [
            { text: 'Hackathon', style: { color: 'black', background: rainbowGradient}},
            // { text: 'React', style: { backgroundColor: 'red'} },
            // { text: 'Django', style: { backgroundColor: 'red'} },
        ]
    },
    { 
    image: hackathon2,
    title: "AT&T Website", 
    description: (
        <span> 
        <a href="https://inside.att.jobs/empowherhackathon#subpage/welcome.io" target="_blank" rel="noopener noreferrer">AT&T EmpowHer:</a>{" "}
        Deployed on Netlify, the <a href="https://attempowherhackathon.netlify.app/" target="_blank" rel="noopener noreferrer">website</a>{" "}
        was made using HTML/CSS with JS to integrate GoogleMaps and News API.
            
    </span>
    ),
    captions: [
        { text: 'Hackathon', style: { background: blueGradient, color: 'black'}},
        // { text: 'HTML', style: { backgroundColor: 'blue'}},
    ]

    },
    { 
    image: hackathon3, 
    title: "Word Clouds",
    description: (
        <span> 
        <a href="https://ww2.amstat.org/education/datafest/" target="_blank" rel="noopener noreferrer">DataFest 2023:</a>{" "}
        A competition where we made data visualizations based off of a huge dataset with 
        200,000+ questions from clients for their lawyers.
    </span>
    ),
    captions: [
        { text: 'Hackathon', style: { color: 'black', background: lightGreenGradient}},
        // { text: 'Pandas', style: { backgroundColor: 'lightgreen'} },
    ]
    },
    { 
    image: personal_project1, 
    title: "Maplestory",
    description: "To practice Flutter and it's widgets, states, and frame animations, I replicated the core gameplay loop of one of my favorite childhood games, Maplestory.",
    captions: [
        { text: 'Flutter', style: { color: 'black', background: orangeGradient } },
        // { text: 'Dart', style: { background: orangeGradient} }
    ] 
    },
    { 
    image: personal_project2, caption: 'Invaded Space',
    title: "Invaded Space",
    description: "My contribution to a Game Jam session in Video Game Development Club! Our goal was to create a tower defense game, where I was in charge of programming player & enemy units as well as projectile logic.",
    captions: [
        { text: 'Unity', style: { color: 'white', background: violetGradient} },
        // { text: 'C#', style: { color: 'white', background: violetGradient} }
    ]  
    },
    { 
    image: personal_project3, caption: 'Bullseye', 
    title: "Bullseye",
    description: "To learn SwiftUI and try mobile app development for the first time, I made a series of apps using Swift UI including a sleep tracker, time converter, tip calculator, Word Scrabble, Guess the Flag, and this Bullseye game.",
    captions: [
        { text: 'SwiftUI', style: { color: 'black', background: targetGradient} },
        // { text: 'Swift', style: { backgroundColor: 'red'} }
    ]    
    },
];
  

// Function to add padding to each caption
const addPaddingToCaptions = (projects) => {
    return projects.map(project => ({
        ...project,
        captions: project.captions.map(caption => ({
            ...caption,
            style: { ...caption.style, borderRadius: '.5rem', margin: '0px 3px', padding: '3.5px 10px' }
        }))
    }));
};

// New project data w/ all the styles above like padding. Pass this in instead.
const updatedProjectData = addPaddingToCaptions(project_data);

function Projects() {
    const [currentDescription, setCurrentDescription] = useState('');
    const [currentTitle, setCurrentTitle] = useState('');
    const [currentCaptions, setCurrentCaptions] = useState([]);
    const carouselRef = useRef(null);
    const [bgClass, setBgClass] = useState('bg-slide-0'); // Background for each slide
    const projectsRef = useRef(null);           // Ref to play animations when Projects section is in view
    const isInView = useInView(projectsRef);    //

    useEffect(() => {
        console.log("Projects.js: useEffect");
        const descriptionUpdater = () => {
            const currentIndex = carouselRef.current?.getSelectedIndex();
            if (currentIndex !== undefined) {
                const project = updatedProjectData[currentIndex];
                setCurrentDescription(project.description);
                setCurrentTitle(project.title);
                setCurrentCaptions(Array.isArray(project.captions) ? project.captions : []);
                setBgClass(`bg-slide-${currentIndex}`); // Update the background class based on slide index
                // console.log("Projects.js: Slide Index: " + currentIndex);
                // console.log("Projects.js: Slide Title: " + project.title); 
                // console.log("Projects.js: Slide Desc: " + project.description); 
                // console.log("Projects.js: Slide Captions: " + project.captions);
            }
        };

        // Update description initially and on slide change
        descriptionUpdater();
        const interval = setInterval(descriptionUpdater, 1000); // Adjust the interval as needed

        return () => clearInterval(interval);
    }, [currentDescription]);
    
    // Mapping data to carousel items for Carousel.tsx
    const carouselItems = updatedProjectData.map((project, index) => ({
        image: project.image,
        content: (
        <div key={index}>
            <p>{project.description}</p>
            <div>
            {project.captions.map((caption, capIndex) => (
                <span key={capIndex} style={caption.style}>
                {caption.text}
                </span>
            ))}
            </div>
        </div>
        ),
    }));

    // Function: Animate the clicked arrow button
    document.querySelectorAll('.arrow__button').forEach(arrowButton => {
        arrowButton.addEventListener('click', function() {
            // Force restart of the animation
            this.classList.remove('animation');
            void this.offsetWidth; // Trigger a reflow to restart the animation
            this.classList.add('animation');

            // Set a timeout to remove the animation class after 1.4 seconds
            setTimeout(() => {
                this.classList.remove('animation');
            }, 1400); // 1.4 seconds
        });
    });

    // Function: Click right arrow button to go to the next slide
    const goToNextSlide = () => {
        carouselRef.current?.next(); // Calls the 'next' method of Carousel
    };

    // Function: Click left arrow button to go to the previous slide
    const goToPrevSlide = () => {
        carouselRef.current?.prev(); // Calls the 'prev' method of Carousel
    };


    return (
        <section className="projects">
            <h1 className='projects__header'>
                        Project Showcase
                    </h1>
            <div className="projects__section">
                <div className="projects__left">
                    <div className="projects__carousel-wrapper">
                        <Carousel ref={carouselRef} items={carouselItems}/>
                    </div>
                </div>
                <div className="projects__right">
                    <div className="projects__text-container gradient-border">
                        <div className="row-wrapper">
                            <h2 className="projects__title">{currentTitle}</h2>
                            <div className="projects__captions ">
                            {currentCaptions.map((caption, index) => (
                                <span key={index} style={caption.style}>
                                    {caption.text}
                                </span>
                            ))}
                            </div>
                            <div className="arrow__buttons__container">
                                <div className="arrow__button left" onClick={goToPrevSlide}></div>
                                <div className="arrow__button right" onClick={goToNextSlide}></div>
                            </div>
                        </div>
                        <div className="projects__description">{currentDescription}</div>
                    </div>
                </div>
            </div>
        </section>
    );
    
    }

export default Projects;
