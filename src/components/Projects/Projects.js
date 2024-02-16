//--------------------------------------------------------------------------------------//
//                                       Projects.js                                       //
//--------------------------------------------------------------------------------------//

// Libraries & Files
import React, { useState, useEffect, useRef } from 'react';
import useInView from '../../hooks/useInView'; 
import Carousel  from './Carousel.tsx'; // Credit: React Round Carousel by scriptex: https://github.com/scriptex/react-round-carousel
import { useDarkMode } from '../../shared/DarkModeToggle/DarkModeContext';
import classNames from 'classnames';
import './Projects.css';

// Slideshow images & video in webp format - Optimized for faster loading
import attempowherWebp from '../../images/projects_images/slideshow_images/att_empowher.webp';
import datafestWebp from '../../images/projects_images/slideshow_images/datafest.webp';
import bullseyeWebp from '../../images/projects_images/slideshow_images/bullseye.webp';

// Slideshow videos in mp4 format - Optimized for faster loading
import lyriclinkMp4 from '../../images/projects_images/slideshow_images/lyric_link.mp4';
import maplestoryMp4 from '../../images/projects_images/slideshow_images/maplestory_app.mp4';
import invadedspaceMp4 from '../../images/projects_images/slideshow_images/invaded_space.mp4';

// Backup slideshow imagesin png/ mp4 format - For browsers that don't support webp
import attempowherPng from '../../images/projects_images/slideshow_images/att_empowher.png';
import datafestPng from '../../images/projects_images/slideshow_images/datafest.png';
import bullseyePng from '../../images/projects_images/slideshow_images/bullseye.png';

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
        // videoWebp: lyriclinkWebp,
        videoMp4: lyriclinkMp4,
        title: "Lyric Link",
        description: (
            <span> 
                <a href="https://sachacks.io" target="_blank" rel="noopener noreferrer">SacHacks 2023:</a>{" "}
                A full stack application using Billboard's API to replicate a music forum 
                where people could discuss songs in the current Top 100.
            </span>
        ),
        captions: [
            { text: 'Hackathon', style: { background: rainbowGradient}},
        ]
    },

    { 
        image: attempowherPng,
        imageWebp: attempowherWebp,
        title: "AT&T Site", 
        description: (
            <span> 
            <a href="https://inside.att.jobs/empowherhackathon#subpage/welcome.io" target="_blank" rel="noopener noreferrer">AT&T EmpowHer:</a>{" "}
            Deployed on Netlify, the <a href="https://attempowherhackathon.netlify.app/" target="_blank" rel="noopener noreferrer">website</a>{" "}
            was made using HTML/CSS with JS to integrate GoogleMaps and News API.
                
        </span>
        ),
        captions: [
            { text: 'Hackathon', style: { background: blueGradient, }},
        ]

    },

    { 
        image: datafestPng, 
        imageWebp: datafestWebp,
        title: "Word Cloud",
        description: (
            <span> 
            <a href="https://ww2.amstat.org/education/datafest/" target="_blank" rel="noopener noreferrer">DataFest 2023:</a>{" "}
            A competition where we made data visualizations based off of a huge dataset with 
            200,000+ questions from clients for their lawyers.
        </span>
        ),
        captions: [
            { text: 'Hackathon', style: { background: lightGreenGradient}},
        ]
    },

    { 
        // videoWebp: maplestoryWebp,
        videoMp4: maplestoryMp4,
        title: "Maplestory",
        description: "To practice Flutter and its widgets, states, and frame animations, I replicated the core gameplay loop of one of my favorite childhood games, Maplestory.",
        captions: [
            { text: 'Flutter', style: { background: orangeGradient } },
        ] 
    },

    { 
        // videoWebp: invadedspaceWebp,
        videoMp4: invadedspaceMp4,
        title: "Invaded Space",
        description: "My contribution to a Game Jam session in Video Game Development Club! Our goal was to create a tower defense game, where I was in charge of programming player & enemy units as well as projectile logic.",
        captions: [
            { text: 'Unity', style: { color: 'white', background: violetGradient} },
        ]  
    },
    { 
        image: bullseyePng, 
        imageWebp: bullseyeWebp,
        title: "Bullseye",
        description: "To learn SwiftUI and try mobile app development for the first time, I made a series of apps using Swift UI including a sleep tracker, time converter, tip calculator, Word Scrabble, Guess the Flag, and this Bullseye game.",
        captions: [
            { text: 'SwiftUI', style: { background: targetGradient} },
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

// New project data w/ all the styles above like padding. Pass this arg in instead.
const updatedProjectData = addPaddingToCaptions(project_data);

function Projects() {
    const [currentDescription, setCurrentDescription] = useState('');
    const [currentTitle, setCurrentTitle] = useState('');
    const [currentCaptions, setCurrentCaptions] = useState([]);
    const { isDarkMode } = useDarkMode();
    const carouselRef = useRef(null);
    const projectsRef = useRef(null);           // Ref to play animations when Projects section is in view
    const isProjectsInView = useInView(projectsRef, { threshold:[0.2], sectionName: "projects"});    //
    const projectsHeader = classNames({
        'projects__header': true,
        'section-header': true,
        'animate-projects-header': isProjectsInView,
        'dark-mode': isDarkMode,
    });
    const projectsSubHeader = classNames({
        'projects__subheader': true,
        'section-subheader': true,
        'animate-projects-subheader': isProjectsInView,
        'dark-mode': isDarkMode,
    });
    const projectsLeft = classNames({
        'projects__left': true,
        'animate-projects-left': isProjectsInView,
        'dark-mode': isDarkMode,
    });
    const projectsRight = classNames({
        'projects__right': true,
        'animate-projects-right': isProjectsInView,
        'dark-mode': isDarkMode,
    });

    // Function to check browser for WebP support
    const supportsWebp = () => {
        try {
        return document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0;
        } catch (err) {
        return false;
        }
    };  

    // On mount, prefetch images and videos
    useEffect(() => {
        // New useEffect for prefetching
        const webpSupported = supportsWebp(); // Assuming supportsWebp is defined/available

        const mediaToPrefetch = [
            webpSupported ? attempowherWebp : attempowherPng,
            webpSupported ? datafestWebp : datafestPng,
            webpSupported ? bullseyeWebp : bullseyePng,
            lyriclinkMp4,
            maplestoryMp4,
            invadedspaceMp4
        ];

        mediaToPrefetch.forEach((mediaPath) => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.as = 'image'; // or 'video' for videos, adjust as necessary
            link.href = mediaPath;
            document.head.appendChild(link);
        });
    }, []); // Empty dependency array means this runs once on component mount


    // On mount, update the description and title of the current slide
    useEffect(() => {
        // Function: Update the description and title of the current slide
        const descriptionUpdater = () => {
            const currentIndex = carouselRef.current?.getSelectedIndex();
            if (currentIndex !== undefined) {
                const project = updatedProjectData[currentIndex];
                setCurrentDescription(project.description);
                setCurrentTitle(project.title);
                setCurrentCaptions(Array.isArray(project.captions) ? project.captions : []);
            }
        };
    
        // Update description initially and on slide change
        descriptionUpdater();
        const interval = setInterval(descriptionUpdater, 1000);
    
        // Set a timeout to hide the tutorial text after 4 seconds
        let tutorialTimeout;
        if (isProjectsInView) {
            tutorialTimeout = setTimeout(() => {
                const tutorialElement = document.querySelector('.projects__carousel__tutorial');
                if (tutorialElement) tutorialElement.classList.add('tutorial-hide');
            }, 5000);
        } else {
            const tutorialElement = document.querySelector('.projects__carousel__tutorial');
            if (tutorialElement) tutorialElement.classList.remove('tutorial-hide');
        }
    
        // Cleanup function to clear interval and timeout when the component unmounts
        return () => {
            clearInterval(interval);
            if (tutorialTimeout) clearTimeout(tutorialTimeout);
        };
    }, [isProjectsInView, currentDescription]); // Dependencies: isProjectsInView and currentDescription
    
    
    // Mapping data to carousel items for Carousel.tsx.
    // Note: Carousel.tsx shows a video if it exists, otherwise it shows a webp, and finally a png if webp is not supported.
    const carouselItems = updatedProjectData.map((project, index) => ({
        image: project.image,           // Fall back to png/mp4 if webp is not supported
        imageWebp: project.imageWebp,
        videoWebp: project.videoWebp,
        videoMp4: project.videoMp4,
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

    // Render the Projects section
    return (
        <section className="projects" id="projects" ref = {projectsRef}>
            {/* Header title */}
            <h1 className = {projectsHeader}> Project Showcase </h1>
            <h2 className = {projectsSubHeader}>All of my projects below can be found pinned on my&nbsp;
                <a href="https://github.com/KevCendana" target="_blank" className="" rel="noopener noreferrer">GitHub.</a>
            </h2>
            <div className = "projects__section">
                {/* Left side w/ Carousel slideshow  */}
                <div className = {projectsLeft}>
                    <div className="projects__carousel-wrapper">
                        <Carousel ref={carouselRef} items={carouselItems}/>
                    </div>
                </div>
                {/* Right side w/ dynamic project description */}
                <div className = {projectsRight}>
                    <div className="projects__text-container">
                        <div className="row-wrapper">
                            {/* Title & Captions */}
                            <h2 className="projects__title">{currentTitle}</h2>
                            <div className="projects__captions ">
                            {currentCaptions.map((caption, index) => (
                                <span key={index} style={caption.style}>
                                    {caption.text}
                                </span>
                            ))}
                            </div>
                            {/* Arrow buttons */}
                            <div className="arrow__buttons__container">
                                <button className="arrow__button left" onClick={goToPrevSlide} aria-label = "Previous Slide Button"></button>
                                <button className="arrow__button right" onClick={goToNextSlide} aria-label = "Previous Slide Button"></button>
                            </div>
                        </div>
                        {/* Description */}
                        <p className="projects__description">{currentDescription}</p>
                    </div>
                    {/* Instructions on how to move the Carousel, dissapears after a few sec. */}
                    <div className='projects__carousel__tutorial'>
                        <p><i>Scroll with buttons, arrow keys, or swipe.</i></p>
                        <div className="tutorial__gifs-container">
                            <div className="tutorial__gif tap-animation"></div>
                            <div className="tutorial__gif key-animation"></div>
                            <div className="tutorial__gif swipe-animation"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
    
    }

export default Projects;
