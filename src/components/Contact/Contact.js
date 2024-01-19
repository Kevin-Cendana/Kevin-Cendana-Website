//--------------------------------------------------------------------------------------//
//                                   Contact.js                                         //
//--------------------------------------------------------------------------------------//

import React, { useRef, useState } from 'react';

import { useDarkMode } from '../../shared/DarkModeToggle/DarkModeContext';
import useInView from '../../hooks/useInView';
import classNames from 'classnames';
import './Contact.css';

import kevinIcon from '../../images/kevin_icon.png';

function Contact() {
const { isDarkMode } = useDarkMode(); // Get the global state for dark mode 
const [showPopup, setShowPopup] = useState(false); // State for showing the popup
const [popupMessage, setPopupMessage] = useState(""); // State for the popup message

const contactRef = useRef(null); // Ref for contact section
const isContactInView = useInView(contactRef, { threshold: [0.2], sectionName: 'resume-contact' } );

const contactLeftClass = classNames({
    'contact-left': true,
    'animate-contact-left': isContactInView,
    'dark-mode': isDarkMode 
});
const contactRightClassSmall = classNames({
    'small-screens-only': true,
    'contact-right': true,
    'animate-contact-right': isContactInView,
    'dark-mode': isDarkMode
});
const contactRightClassBig = classNames({
    'big-screens-only': true,
    'contact-right': true,
    'animate-contact-right': isContactInView,
    'dark-mode': isDarkMode
});
const contactHeaderClass = classNames({
    'contact-header': true,
    'section-header': true,
    'animate-contact-header': isContactInView,
    'dark-mode': isDarkMode
});
const contactSubHeaderClass = classNames({
    'contact-subheader': true,
    'section-subheader': true,
    'animate-contact-header': isContactInView,
    'dark-mode': isDarkMode
});


// PopUp for Contact Form Submission - Pops up a white box with a message
const Popup = ({ message, onClose }) => {
    return (
    <div className="popup-background"> 
        <div className="popup">
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
        </div>
    </div>
    );
};

// Function: Handle Form Submission
const handleFormSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    
    const form = event.target; // Get the form element
    const formData = new FormData(form); // Create a FormData object from the form

    // Send the form data to the server
    fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams([...formData]).toString() // Convert the FormData object to a URL-encoded string
    })
    // Handle the response
    .then(response => {
    // If the response is ok, show a success message
    if (response.ok) {
        setPopupMessage("Thank you! Your message has been sent successfully.");
        setShowPopup(true); // Show the popup
        form.reset(); // Reset the form
    // Else, show an error message
    } else {
        setPopupMessage("Failed to send message. Please try again later.");
        setShowPopup(true);
    }
    })
    // If there's an error during the fetch operation
    .catch(error => {
    console.error('Error:', error); // Log the error to the console
    setPopupMessage("An error occurred. Please try again later."); 
    setShowPopup(true); // Show the popup
    });
};

// Function: Close Popup
const closePopup = () => {
    setShowPopup(false);
};

return (

    <section className='contact' ref = {contactRef}>
        <h1 className = {contactHeaderClass}>Contact Me</h1>
        <h2 className = {contactSubHeaderClass}>Leave me a message and I'll get back to you as soon as possible. </h2>
        <div className="contact-main-content-wrapper">
            {/* Move Contact Right to the top on small screens. */}
            <div className={contactRightClassSmall}>
                <div className = "contact-info">
                    <div className ="contact-profile-picture-container">
                        <img src = {kevinIcon} className = "contact-profile-picture" alt = "Kevin Contact Icon"></img>
                    </div>
                    <div className="contact-info-text">
                        <p className = "contact-name">Kevin Cendana </p>
                        <p className = "contact-city">Sacramento, CA</p>
                        <a className = "contact-email" href="mailto:KevinCendana@outlook.com">KevinCendana@outlook.com</a>
                    </div>
                </div>
            </div>            

            {/* Contact Left Side - Contains Email Form */}
            <div className={contactLeftClass}>
                <form className="contact-form" name="contact" method="POST" onSubmit={handleFormSubmit} data-netlify="true">
                <input type="hidden" name="form-name" value="contact" />
                <div className="contact-name-and-email">
                    <input type="text" id="name" name="name" placeholder="Name" autoComplete="name" className="contact-form-name" />
                    <input type="email" id="email" name="email" placeholder="Email" autoComplete="email" className="contact-form-email"/>
                </div>
                <textarea id="message" name="message" className="contact-form-message" placeholder="Message"></textarea>
                <button className="contact-submit-button" type="submit">Send</button>
                </form>
            </div>

            {showPopup && <Popup message={popupMessage} onClose={closePopup} />}
            {/* Contact Right Side - Contains Contact Info */}
            <div className={contactRightClassBig}>
                <div className = "contact-info">
                    <div className ="contact-profile-picture-container">
                        <img src = {kevinIcon} className = "contact-profile-picture" alt = "Kevin Contact Icon"></img>
                    </div>
                    <div className="contact-info-text">
                        <p className = "contact-name">Kevin Cendana </p>
                        <p className = "contact-city">Sacramento, CA</p>
                        <a className = "contact-email" href="mailto:KevinCendana@outlook.com">KevinCendana@outlook.com</a>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

}

export default Contact;
