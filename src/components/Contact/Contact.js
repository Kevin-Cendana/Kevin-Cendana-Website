//--------------------------------------------------------------------------------------//
//                                   Contact.js                                         //
//--------------------------------------------------------------------------------------//

import React, { useRef, useState } from 'react';

import { useDarkMode } from '../../shared/DarkModeToggle/DarkModeContext';
import useInView from '../../hooks/useInView';
import classNames from 'classnames';
import './Contact.css';

// import kevinIconPng from '../../images/contact_images/kevin_smiling.png';
// import kevinIconWebp from '../../images/contact_images/kevin_smiling.webp';
import kevinIconPng from '../../images/contact_images/kevin-smiling.png';
import kevinIconWebp from '../../images/contact_images/kevin-smiling.webp';

import phoneIcon from '../../images/contact_images/phone_icon.png';
import globeIcon from '../../images/contact_images/globe_icon.png';
import mailIcon from '../../images/contact_images/mail_icon.png';
import arrowIcon from '../../images/contact_images/arrow_icon.png';

function Contact() {
const { isDarkMode } = useDarkMode(); // Get the global state for dark mode 
const contactRef = useRef(null); // Ref for contact section
const isContactInView = useInView(contactRef, { threshold: [0.2], sectionName: 'resume-contact' } );
const [imageSrc, setImageSrc] = useState(kevinIconWebp);

// Function to handle the case when the image fails to load
const handleError = () => {
  setImageSrc(kevinIconPng); // Fallback to PNG if WebP fails
};


const contactLeftClass = classNames({
    'contact-left': true,
    'animate-contact-left': isContactInView,
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


// Render the Contact Section
return (
    <section className='contact' id = "contact" ref = {contactRef}>

            {/* Contact Left Side - Contact Info */}
            <div className={contactLeftClass}> 
                <h1 className = {contactHeaderClass}>Get In Touch</h1>
                <h2 className = {contactSubHeaderClass}>Feel free to say hello! I'll get back to you as soon as possible. </h2>
                <div className = "contact-info-container">
                    <img src={phoneIcon} alt="phone icon" className="contact-icon"/>
                    <div class="contact-info-text">
                        <h3>Contact Me</h3>
                        <h3>(209) 855 - 1597</h3>
                    </div>
                </div>
                <div className = "contact-info-container">
                    <img src={globeIcon} alt="globe icon" className="contact-icon"/>
                    <div class="contact-info-text">
                        <h3>Kevin Cendana</h3>
                        <h3>Rancho Cordova, CA</h3>
                    </div>
                </div>
                <div className = "contact-info-container">
                    <img src={mailIcon} alt="mail icon" className="contact-icon"/>
                    <div class="contact-info-text">
                        <h3>E-Mail</h3>
                        <h3>kevincendana@outlook.com</h3>
                    </div>
                </div>
            </div>

            {/* Contact Right Side - Form */}
            <div className={contactRightClassBig}>
            <form className="contact-form" name="contact" method="POST" action="https://api.web3forms.com/submit">
                <input type="hidden" name="access_key" value="dbd50966-efb7-4221-8a8a-0349a0714f37" />
                <div className="contact-name-and-email">
                    <h3>Name</h3>
                    <input type="text" id="name" name="name" placeholder="" autoComplete="name" className="contact-form-name" required/>
                    <h3>Email</h3>
                    <input type="email" id="email" name="email" placeholder="" autoComplete="email" className="contact-form-email" required/>
                </div>
                <h3>Message</h3>
                <textarea id="message" name="message" className="contact-form-message" placeholder="" required></textarea>
                <div className="h-captcha" data-captcha="true"></div>
                <button className="contact-submit-button" type="submit">SEND MESSAGE<img class = "send-arrow" src={arrowIcon} alt='send-icon'></img></button>
                </form>
                <script src="https://web3forms.com/client/script.js" async defer></script>
            </div>
    </section>
);

}

export default Contact;
