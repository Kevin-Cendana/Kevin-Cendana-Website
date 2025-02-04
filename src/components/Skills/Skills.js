// Libraries + Files
import React, { useRef, useState, useEffect } from 'react';
import useInView from '../../hooks/useInView';  
import classNames from 'classnames';  
import { useDarkMode } from '../../shared/DarkModeToggle/DarkModeContext';
import './Skills.css';
import HoverImage from '../../shared/HoverImage.js';

// Icons - Static, Gif, and WebP (Gifs are for older browsers)
import codingIcon from '../../images/skills_images/code_icon.png';
import codingIconGif from '../../images/skills_images/code_icon.gif';
import codingIconWebP from '../../images/skills_images/code_icon.webp';
import competingIcon from '../../images/skills_images/hackathon_icon.png';
import competingIconGif from '../../images/skills_images/hackathon_icon.gif';
import competingIconWebP from '../../images/skills_images/hackathon_icon.webp';
import caringIcon from '../../images/skills_images/caring_icon.png';
import caringIconGif from '../../images/skills_images/caring_icon.gif';
import caringIconWebP from '../../images/skills_images/caring_icon.webp';
import creatingIcon from '../../images/skills_images/creating_icon.png';
import creatingIconGif from '../../images/skills_images/creating_icon.gif';
import creatingIconWebP from '../../images/skills_images/creating_icon.webp';

// Skills Component
function Skills() {
    // Refs and state
    const { isDarkMode } = useDarkMode();
    const skillsRef = useRef(null);
    const [supportsWebP, setSupportsWebP] = useState(false);
    const [allImagesLoaded, setAllImagesLoaded] = useState(false); // New state to track if all images are loaded

    // Determine if the skills section is in view
    const isSkillsInView = useInView(skillsRef, { threshold: [0.25], sectionName: 'skills' }) && allImagesLoaded; // Updated to consider allImagesLoaded

    // Class Names for dynamic styling
    const skillsHeaderClass = classNames({
        'skills-header': true,
        'section-header': true,
        'animate-header': isSkillsInView,
        'dark-mode': isDarkMode 
    });
    const skillsSubheaderClass = classNames({
        'skills-subheader': true,
        'section-subheader': true,
        'animate-header': isSkillsInView,
        'dark-mode': isDarkMode 
    });
    const skillsCategoryClassRight = classNames({
        'skills-category': true,
        'animate-skills-category-right': isSkillsInView,
        'dark-mode': isDarkMode 
    });
    const skillsCategoryClassLeft = classNames({
        'skills-category': true,
        'animate-skills-category-left': isSkillsInView,
        'dark-mode': isDarkMode 
    });

    // On mount, check if browser has WebP support
    useEffect(() => {
        const testWebP = new Image();
        testWebP.onload = testWebP.onerror = () => {
            setSupportsWebP(testWebP.height === 2);
            prepareImages(testWebP.height === 2); // Call prepareImages here with the result of WebP support check
        };
        testWebP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    }, []);

    // Function to premptively load images and check if they are loaded
    const prepareImages = (supportsWebP) => {
        const imagesToLoad = supportsWebP ? [codingIconWebP, competingIconWebP, caringIconWebP, creatingIconWebP] : [codingIconGif, competingIconGif, caringIconGif, creatingIconGif];
        let loadedImagesCount = 0;

        imagesToLoad.forEach(src => {
            const img = new Image();
            img.onload = img.onerror = () => {
                loadedImagesCount++;
                if (loadedImagesCount === imagesToLoad.length) {
                    setAllImagesLoaded(true); // Set allImagesLoaded to true once all images are loaded
                }
            };
            img.src = src;
        });
    };

    // Choose the right image format based on WebP support
    const getImageSource = (webP, gif) => supportsWebP ? webP : gif;

    // Return Skills Component
    return (
        <section className="skills" id="skills" ref = {skillsRef}>
            {/* Header */}
            <h1 className={skillsHeaderClass}>What I do</h1>
            <h2 className={skillsSubheaderClass}>Building vibrant web worlds, one line of code at a time.</h2>
             {/* Skill Categories */}
            <div className="skills-category-container">
                {/* Category - Coding */}
                <div className={skillsCategoryClassRight}>
                    <div className="skills-icon-header-wrapper">
                        <HoverImage defaultImage={codingIcon} hoverImage={getImageSource(codingIconWebP, codingIconGif)} key={isSkillsInView} />
                        <h2>Coding</h2>
                    </div>
                    <p>
                        Whether it's for my career and my hobby, I love coding.
                        I've always been drawn to the puzzle solving aspect and the challenges that come with it.
                    </p>
                </div>           
                {/* Category - Creating */}
                <div className={skillsCategoryClassRight}>
                    <div className = "skills-icon-header-wrapper">
                        <HoverImage defaultImage={creatingIcon} hoverImage={getImageSource(creatingIconWebP, creatingIconGif)} key={isSkillsInView} />
                        <h2>Creating</h2>
                    </div>  
                    <p>
                        Creating something new and seeing it come to life is the most beloved part of coding for me. 
                        That's why frontend dev and design is my programming field of choice.

                    </p>
                </div>           
                {/* Category - Competing */}
                <div className={skillsCategoryClassLeft} ref={skillsRef}>
                <div className = "skills-icon-header-wrapper">
                        <HoverImage defaultImage={competingIcon} hoverImage={getImageSource(competingIconWebP, competingIconGif)} key={isSkillsInView} />
                        <h2>Competing</h2>
                    </div>  
                    <p>
                        Hackathons are exciting challenges for me to learn new technologies and build something beautiful.
                        I've been to 5 so far & I'm looking forward to attending more.
                    </p>
                </div>      
                {/* Category - Caring */}
                <div className={skillsCategoryClassLeft} ref={skillsRef}>
                <div className = "skills-icon-header-wrapper">
                        <HoverImage defaultImage={caringIcon} hoverImage={getImageSource(caringIconWebP, caringIconGif)} key={isSkillsInView} />
                        <h2>Caring</h2>
                    </div>  
                    <p>
                        Above all, I love doing what I do, and I strive to make that clear in every project I make. 
                        I'm always learning and growing, and I'm excited to see where my journey takes me.
                    </p>
                </div>      
            </div>
        </section>
    );
}

export default Skills;  