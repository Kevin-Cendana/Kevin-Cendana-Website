import React from 'react';
import '../AppColors.css';
import emailIcon from '../images/shared_images/email_icon.png';

const buttonStyle = {
    width: 'clamp(65px, 18vw, 165px)',
    backgroundColor: 'var(--app-theme-color)',
    color: 'white',
    border: 'none',
    borderRadius: '30px',
    padding: 'clamp(6px, 1.5vw, 12px)',
    fontFamily: 'Gilroy',
    fontWeight: '600',
    fontSize: 'clamp(6px, 1.4vw, 15.5px)',
    textDecoration: 'none',
    cursor: 'pointer'
};

const emailIconStyle = {
    display: 'inline-block',
    width: 'clamp(7px, 1.7vw, 17px)',
    marginRight: 'clamp(3px, 0.8vw, 8px)',
    transform: 'translateY(clamp(1px, 0.4vw, 4px))'
};

const ContactMeButton = () => {
    return (
        <a href="#contact" style={buttonStyle} className="contact-me-button">
            <img src={emailIcon} alt="Email Icon" style={emailIconStyle} />
            CONTACT ME
        </a>
    );
};

export default ContactMeButton;