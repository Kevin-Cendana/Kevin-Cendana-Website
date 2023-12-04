//--------------------------------------------------------------------------------------//
//                                       Projects.js                                       //
//--------------------------------------------------------------------------------------//


import React, { useState, useEffect, useRef } from 'react';
import Carousel  from './Carousel.tsx'; // Credit: React Round Carousel by scriptex: https://github.com/scriptex/react-round-carousel
import DarkModeToggle from '../NavigationBar/DarkModeToggle';
import personal_project1 from '../images/slideshow_images/maplestory_app.gif';
import personal_project2 from '../images/slideshow_images/invaded_space.gif';
import personal_project3 from '../images/slideshow_images/bullseye.png';
import hackathon1 from '../images/slideshow_images/lyric_link.gif';
import hackathon2 from '../images/slideshow_images/att_empowher.png';
import hackathon3 from '../images/slideshow_images/datafest.png';
import coursework_project3 from '../images/slideshow_images/turing_machines.png';
import coursework_project1 from '../images/slideshow_images/data_visualization.png';
import './Projects.css';

// Array of slides to use for slideshow pictures
const project_data = [
    { 
        image: hackathon1, 
        title: "Lyric Link",
        description: "Lyric Link",
        captions: [
            { text: 'SacHacks', style: { } },
            { text: 'React', style: { backgroundColor: 'blue'} },
            { text: 'Django', style: { backgroundColor: 'blue'} }
        ]
    },
    { 
    image: hackathon2,
    title: "Project 1", 
    description: "2lyric link test filler test test beep boop bert bert bert",
    captions: [
        { text: 'AT&T: EmpowHer', style: { backgroundColor: ''} },
        { text: 'HTML', style: { backgroundColor: 'green'} },
        { text: 'CSS', style: { backgroundColor: 'green'} },
    ]

    },
    { 
    image: hackathon3, 
    title: "Project 1",
    description: "3lyric link test filler test test beep boop bert bert bert",
    captions: [
        { text: 'Datafest', style: { } },
        { text: 'Pandas', style: { backgroundColor: 'blue'} },
        { text: 'Python', style: { backgroundColor: 'green'} }
    ]
    },
    { 
    image: personal_project1, 
    title: "Project 1",
    description: "4lyric link test filler test test beep boop bert bert bert",
    captions: [
        { text: 'Maplestory', style: { } },
        { text: 'Flutter', style: { backgroundColor: 'blue'} },
        { text: 'Dart', style: { backgroundColor: 'green'} }
    ] 
    },
    { 
    image: personal_project2, caption: 'Invaded Space',
    title: "Project 1",
    description: "5lyric link test filler test test beep boop bert bert bert",
    captions: [
        { text: 'Game Jam', style: { } },
        { text: 'Unity', style: { backgroundColor: 'blue'} },
        { text: 'C#', style: { backgroundColor: 'green'} }
    ]  
    },
    { 
    image: personal_project3, caption: 'Bullseye', 
    title: "Project 1",
    description: "6lyric link test filler test test beep boop bert bert bert",
    captions: [
        { text: 'Bullseye', style: { } },
        { text: 'SwiftUI', style: { backgroundColor: 'blue'} },
        { text: 'Swift', style: { backgroundColor: 'green'} }
    ]    
    },
];

function Projects() {
    const [currentDescription, setCurrentDescription] = useState('');
    const [currentTitle, setCurrentTitle] = useState('');
    const [currentCaptions, setCurrentCaptions] = useState('');
    const carouselRef = useRef(null);

    useEffect(() => {
        console.log("Projects.js: useEffect");
        const descriptionUpdater = () => {
            const currentIndex = carouselRef.current?.getSelectedIndex();
            if (currentIndex !== undefined) {
                const project = project_data[currentIndex];
                setCurrentDescription(project.description);
                setCurrentTitle(project.title);
                setCurrentCaptions(project.captions);
                console.log("Projects.js: Slide Index: " + currentIndex);
                console.log("Projects.js: Slide Title: " + project.title); 
                console.log("Projects.js: Slide Desc: " + project.description); 
                console.log("Projects.js: Slide Captions: " + project.captions);
            }
        };

        // Update description initially and on slide change
        descriptionUpdater();
        const interval = setInterval(descriptionUpdater, 1000); // Adjust the interval as needed

        return () => clearInterval(interval);
    }, [currentDescription]);
    
    // Mapping data to carousel items for Carousel.tsx
    const carouselItems = project_data.map((project, index) => ({
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
        // Add other properties if the carousel requires?
    }));

    return (
        <div className="projects" id="projects">
            <div className="projects__section">
                <Carousel ref={carouselRef} items={carouselItems} /* other props */ />
                <div className="projects__text-container">
                    <div className="projects__title">{currentTitle}</div>
                    <div className="projects__description">{currentDescription}</div>
                    
                </div>
            </div>
        </div>
    );
    
    }

export default Projects;
