// Libaries + Files
import React, { useRef } from 'react';
import useInView from '../../hooks/useInView';  
import classNames from 'classnames';  
import { useDarkMode } from '../../shared/DarkModeToggle/DarkModeContext';
import './Skills.css';

// Icons
import codeIcon from '../../images/code_icon.png';
import hackathonIcon from '../../images/hackathon_icon.png';
import caringIcon from '../../images/caring_icon.png';
import designIcon from '../../images/design_icon.png';

// Skills Component
function Skills() {
    // Refs
    const { isDarkMode } = useDarkMode();
    const skillsRef = useRef(null);
    const isSkillsInView = useInView(skillsRef, { threshold: [0.25], sectionName: 'skills' } );

    // Class Names for dynamic styling - Changes based on if the section is in view & if dark mode is on
    const headerClass = classNames({
        'skills-header': true,
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
            <h1 className={headerClass}>What I Do</h1>
             {/* Skill Categories */}
            <div className="skills-category-container">
                {/* Category - Coding */}
                <div className={skillsCategoryClassRight}>
                    <div className = "skills-icon-header-wrapper">
                        <img src={codeIcon} alt="Coding Icon" className="skills-icon" />                    
                        <h2>Coding</h2>                
                    </div>  
                    <p>
                        Whether it's for my career and my hobby, I love coding.
                        I've always been drawn to the puzzle solving aspect and I've grown to enjoy the grind.
                    </p>
                </div>           
                {/* Category - Creating */}
                <div className={skillsCategoryClassRight}>
                <div className = "skills-icon-header-wrapper">
                        <img src={designIcon} alt="Creating Icon" className="skills-icon app-icon" />
                        <h2>Creating</h2>
                    </div>  
                    <p>
                        Creating something new and seeing it come to life is the most beloved part of coding for me. 
                        That's why frontend dev and design is my field of choice.

                    </p>
                </div>           
                {/* Category - Competing */}
                <div className={skillsCategoryClassLeft} ref={skillsRef}>
                <div className = "skills-icon-header-wrapper">
                        <img src={hackathonIcon} alt="Hackathon Icon" className="skills-icon hackathon-icon" />
                        <h2>Competing</h2>
                    </div>  
                    <p>
                        Hackathons are exciting challenges for me to learn new technologies and build something beautiful.
                        I've been to 3 so far & I'm looking forward to attending more.
                    </p>
                </div>      
                {/* Category - Caring */}
                <div className={skillsCategoryClassLeft} ref={skillsRef}>
                <div className = "skills-icon-header-wrapper">
                        <img src={caringIcon} alt="Caring Icon" className="skills-icon caring-icon" />
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