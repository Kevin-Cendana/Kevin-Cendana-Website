import React from 'react';
import '../AppColors.css';
import emailIcon from '../images/shared_images/email_icon.png';

const buttonStyle = {
    width: '170px',
    backgroundColor: 'var(--app-theme-color)',
    color: 'white',
    border: 'none',
    borderRadius: '30px',
    padding: '18px',
    fontFamily: 'Gilroy',
    fontWeight: '500',
    fontSize: '16px',
    textDecoration: 'none',
    cursor: 'pointer'
};

const emailIconStyle = {
    display: 'inline-block',
    width: '17px',
    marginRight: '8px',
    transform: 'translateY(2.5px)'
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