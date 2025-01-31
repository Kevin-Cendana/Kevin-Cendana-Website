import React from 'react';
import '../AppColors.css';
import emailIcon from '../images/shared_images/email_icon.png';

const buttonStyle = {
    width: '170px',
    backgroundColor: 'var(--app-theme-color)',
    color: 'white',
    border: 'none',
    borderRadius: '30px',
    padding: 'clamp(6px, 1.8vw, 18px)',
    fontFamily: 'Gilroy',
    fontWeight: '500',
    fontSize: 'clamp(6px, 1.4vw, 16px)',
    textDecoration: 'none',
    cursor: 'pointer'
};

const emailIconStyle = {
    display: 'inline-block',
    width: 'clamp(7px, 1.7vw, 17px)',
    marginRight: 'clamp(3px, 0.8vw, 8px)',
    transform: 'translateY(clamp(1px, 0.3vw, 2.5px))'
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