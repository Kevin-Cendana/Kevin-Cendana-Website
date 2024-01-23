// Libaries + Files
import React, { useRef } from 'react';
import useInView from '../../hooks/useInView';  
import classNames from 'classnames';  
import { useDarkMode } from '../../shared/DarkModeToggle/DarkModeContext';
import '../../shared/HoverImage.js';
import './Skills.css';
import HoverImage from '../../shared/HoverImage.js';

// Icons
import codingIcon from '../../images/code_icon.png';
import codingIconGif from '../../images/code_icon.gif';
import competingIcon from '../../images/hackathon_icon.png';
import competingIconGif from '../../images/hackathon_icon.gif';
import caringIcon from '../../images/caring_icon.png';
import caringIconGif from '../../images/caring_icon.gif';
import creatingIcon from '../../images/creating_icon.png';
import creatingIconGif from '../../images/creating_icon.gif';


// Skills Component
function Skills() {
    // Refs
    const { isDarkMode } = useDarkMode();
    const skillsRef = useRef(null);
    const isSkillsInView = useInView(skillsRef, { threshold: [0.25], sectionName: 'skills' } );

    // Class Names for dynamic styling - Changes based on if the section is in view & if dark mode is on
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

    // Return Skills Component
    return (
        <section className="skills" id="skills" ref = {skillsRef}>
            {/* Header */}
            <h1 className={skillsHeaderClass}>What I Do</h1>
            <h2 className={skillsSubheaderClass}>Building vibrant web worlds, one line of code at a time.</h2>
             {/* Skill Categories */}
            <div className="skills-category-container">
                {/* Category - Coding */}
                <div className={skillsCategoryClassRight}>
                    <div className = "skills-icon-header-wrapper">
                        <HoverImage defaultImage={codingIcon} hoverImage={codingIconGif} key={isSkillsInView} />              
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
                        <HoverImage defaultImage={creatingIcon} hoverImage={creatingIconGif} key={isSkillsInView} />
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
                        <HoverImage defaultImage={competingIcon} hoverImage={competingIconGif} key={isSkillsInView} />              
                        <h2 className = "competing">Competing</h2>
                    </div>  
                    <p>
                        Hackathons are exciting challenges for me to learn new technologies and build something beautiful.
                        I've been to 3 so far & I'm looking forward to attending more.
                    </p>
                </div>      
                {/* Category - Caring */}
                <div className={skillsCategoryClassLeft} ref={skillsRef}>
                <div className = "skills-icon-header-wrapper">
                        <HoverImage defaultImage={caringIcon} hoverImage={caringIconGif} key={isSkillsInView} />
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