import React from 'react';
import '../AppColors.css';
import emailIcon from '../images/shared_images/email_icon.png';

const buttonStyle = {
    width: '170px',
    backgroundColor: 'var(--app-theme-color)',
    color: 'white',
    border: 'none',
    borderRadius: '30px',
    padding: '18px 20px',
    fontFamily: 'Gilroy',
    fontWeight: '500',
    fontSize: '16px',
    cursor: 'pointer'
};

const ContactMeButton = () => {
    return (
        <button style={buttonStyle} className="contact-me-button">
            <img src={emailIcon} alt="Email Icon" style={{ width: '15px', marginRight: '10px' }} />
            CONTACT ME
        </button>
    );
};

export default ContactMeButton;