//--------------------------------------------------------------------------------------//
//                                       Projects.js                                       //
//--------------------------------------------------------------------------------------//

// Libraries & Files
import React, { useState, useEffect, useRef } from 'react';
import useInView from '../../hooks/useInView'; 
import { useDarkMode } from '../../shared/DarkModeToggle/DarkModeContext';
import classNames from 'classnames';
import './Projects.css';

// Slideshow images & video in webp format - Optimized for faster loading
import attempowherWebp from '../../images/projects_images/slideshow_images/att_empowher.webp';
import datafestWebp from '../../images/projects_images/slideshow_images/datafest.webp';
import bullseyeWebp from '../../images/projects_images/slideshow_images/bullseye.webp';
import sgkcWebp from '../../images/projects_images/slideshow_images/sgkc.webp';

// Slideshow videos in mp4 format - Optimized for faster loading
import lyriclinkMp4 from '../../images/projects_images/slideshow_images/lyric_link.mp4';
import maplestoryMp4 from '../../images/projects_images/slideshow_images/maplestory_app.mp4';
import invadedspaceMp4 from '../../images/projects_images/slideshow_images/invaded_space.mp4';

// Backup slideshow imagesin png/ mp4 format - For browsers that don't support webp
import attempowherPng from '../../images/projects_images/slideshow_images/att_empowher.png';
import datafestPng from '../../images/projects_images/slideshow_images/datafest.png';
import bullseyePng from '../../images/projects_images/slideshow_images/bullseye.png';
import sgkcPng from '../../images/projects_images/slideshow_images/sgkc.png';

// Gradient colors for each slide's captions
const rainbowGradient = 'linear-gradient(45deg, #fcb0a9, #a3c9f8, #a6fcb3, #fff2cc)';
const blueGradient = 'linear-gradient(45deg, #e6f9ff, #b3ecff, #80dfff, #4dd2ff, #1ac6ff, #0077be, #004f8c)';
const lightGreenGradient = 'linear-gradient(45deg, #f1f8e9, #dcedc8, #c5e1a5, #aed581, #9ccc65, #8bc34a, #7cb342)';
const greenGradient = 'linear-gradient(45deg, #00cc00, #77dd77, #b3ffb3)';
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
    {
        image: sgkcPng,
        imageWebp: sgkcWebp,
        // title: (
        // <>Sacramento Glory<br></br>Korean Church</>
        // ),
        title: "SGKC",
        description: (
            <span>
            <a href="https://sacglorychurch.org" target="_blank" rel="noopener noreferrer">Sacramento Glory Korean Church:</a>{" "}<br></br>
            For my capstone project, I worked with a team of 8 to create a full stack Church website for a local pastor. 
            </span>
        ),
        captions: [
            { text: 'Capstone', style: { background: greenGradient} },
        ]
    }
];

// Function to add padding to each caption
const addPaddingToCaptions = (projects) => {
    return projects.map(project => ({
        ...project,
        captions: project.captions.map(caption => ({
            ...caption,
            style: { ...caption.style, borderRadius: '.5rem', margin: '0px 0px', padding: '3.5px 10px' }
        }))
    }));
};
function Projects() {
    const { isDarkMode } = useDarkMode();
    const projectsRef = useRef(null);           // Ref to play animations when Projects section is in view
    const isProjectsInView = useInView(projectsRef, { threshold:[0.2], sectionName: "projects"});    //
    const projectsHeader = classNames({
        'projects__header': true,
        'section-header': true,
        'animate-projects-header': isProjectsInView,
        'dark-mode': isDarkMode,
    });
    const projectsSubheader = classNames({
        'projects__subheader': true,
        'animate-projects-subheader': isProjectsInView,
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
        const webpSupported = supportsWebp(); 
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

    // Render the Projects section
    return (
        <section className="projects" id="projects" ref = {projectsRef}>
            <div class="projects__top">
                <h1 className = {projectsHeader}> MY PORTFOLIO </h1>
                <h2 className = {projectsSubheader}> Check out my latest work</h2>
            </div>
        </section>
    );
    
    }

export default Projects;
