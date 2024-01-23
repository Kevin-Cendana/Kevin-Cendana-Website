//--------------------------------------------------------------------------------------//
//                                   Contact.js                                         //
//--------------------------------------------------------------------------------------//

import React, { useRef } from 'react';

import { useDarkMode } from '../../shared/DarkModeToggle/DarkModeContext';
import useInView from '../../hooks/useInView';
import classNames from 'classnames';
import './Contact.css';

import kevinIcon from '../../images/kevin_icon.png';

function Contact() {
const { isDarkMode } = useDarkMode(); // Get the global state for dark mode 

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



return (

    <section className='contact' id = "contact" ref = {contactRef}>
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
                <form className="contact-form" name="contact" method="POST" action="https://api.web3forms.com/submit">
                <input type="hidden" name="access_key" value="dbd50966-efb7-4221-8a8a-0349a0714f37" />
                <div className="contact-name-and-email">
                    <input type="text" id="name" name="name" placeholder="Name" autoComplete="name" className="contact-form-name" required/>
                    <input type="email" id="email" name="email" placeholder="Email" autoComplete="email" className="contact-form-email" required/>
                </div>
                <textarea id="message" name="message" className="contact-form-message" placeholder="Message" required></textarea>
                <div class="h-captcha" data-captcha="true"></div>
                <button className="contact-submit-button" type="submit">Send</button>
                </form>
                <script src="https://web3forms.com/client/script.js" async defer></script>
            </div>

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
