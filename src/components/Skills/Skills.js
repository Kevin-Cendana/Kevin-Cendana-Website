import React from 'react';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css' // source: https://www.npmjs.com/package/react-medium-image-zoom
import './Skills.css';
import DarkModeToggle from '../../shared/DarkModeToggle/DarkModeToggle';

// Icons
import codeIcon from '../../images/code_icon.png';
import hackathonIcon from '../../images/hackathon_icon.png';
import caringIcon from '../../images/caring_icon.png';
import designIcon from '../../images/design_icon.png';

function Skills() {
    return (
        <section className="skills" id="skills">
            <h1 className="skills-header">What I Do</h1>
            <div className="skills-category-container">
                <div className="skills-category">
                    <div classname = "skills-icon-header-wrapper">
                        <img src={codeIcon} alt="Coding Icon" className="skills-icon" />                    
                        <h2>Coding</h2>                
                    </div>  
                    <p>
                        Whether it's for my career and my hobby, I love coding.
                        I've always been drawn to the puzzle solving aspect and I've grown to enjoy the grind.
                    </p>
                </div>           

                <div className="skills-category">
                <div className = "skills-icon-header-wrapper">
                        <img src={designIcon} alt="Creating Icon" className="skills-icon app-icon" />
                        <h2>Creating</h2>
                    </div>  
                    <p>
                        Creating something new and seeing it come to life is the most beloved part of coding for me. 
                        That's why frontend dev and design is my field of choice.

                    </p>
                </div>           

                <div className="skills-category">
                <div classname = "skills-icon-header-wrapper">
                        <img src={hackathonIcon} alt="Hackathon Icon" className="skills-icon" />
                        <h2>Competing</h2>
                    </div>  
                    <p>
                        Hackathons are exciting challenges for me to learn new technologies and build something beautiful.
                        I've been to 3 so far & I'm looking forward to attending more.
                    </p>
                </div>      

                <div className="skills-category">
                <div classname = "skills-icon-header-wrapper">
                        <img src={caringIcon} alt="Caring Icon" className="skills-icon" />
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