import React from 'react';
import '../AppColors.css';
import viewResumeIcon from '../images/shared_images/resume_icon.png';

const buttonStyle = {
    width: 'clamp(70px, 20vw, 165px)',
    backgroundColor: 'transparent',
    color: 'black',
    border: 'none',
    borderRadius: '30px',
    padding: 'clamp(6px, 1.5vw, 12px) clamp(8px, 3vw, 18px)',
    fontFamily: 'Gilroy',
    fontWeight: '600',
    fontSize: 'clamp(6px, 1.4vw, 15.5px)',
    textDecoration: 'none',
    cursor: 'pointer'
};

const resumeIconStyle = {
    display: 'inline-block',
    width: 'clamp(7px, 1.7vw, 17px)',
    marginRight: 'clamp(3px, 0.8vw, 8px)',
    transform: 'translateY(clamp(1px, 0.4vw, 4px))'
};

const ViewResumeButton = () => {
    return (
        <a href="https://docs.google.com/document/d/1xiAtzAXNMSw3ZkajAZaag-O40Fxn4iWoJ1nj-sb5YCA/edit?usp=sharing" style={buttonStyle} className="view-resume-button" target="_blank" rel="noopener noreferrer">
            <img src={viewResumeIcon} alt="Open In New Window Icon" style={resumeIconStyle} />
            VIEW RESUME
        </a>
    );
};

export default ViewResumeButton;