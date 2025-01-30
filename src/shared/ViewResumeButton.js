import React from 'react';
import '../AppColors.css';
import viewResumeIcon from '../images/shared_images/resume_icon.png';

const buttonStyle = {
    width: '170px',
    backgroundColor: 'white',
    color: 'black',
    border: 'none',
    borderRadius: '30px',
    padding: '18px',
    fontFamily: 'Gilroy',
    fontWeight: '500',
    fontSize: '16px',
    textDecoration: 'none',
    cursor: 'pointer'
};

const resumeIconStyle = {
    display: 'inline-block',
    width: '17px',
    marginRight: '8px',
    transform: 'translateY(2.5px)'
};

const ViewResumeButton = () => {
    return (
        <a href="#contact" style={buttonStyle} className="view-resume-button">
            <img src={viewResumeIcon} alt="Open In New Window Icon" style={resumeIconStyle} />
            VIEW RESUME
        </a>
    );
};

export default ViewResumeButton;