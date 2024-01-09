//--------------------------------------------------------------------------------------//
//                                   ResumeContact.js                                   //
//                Both in one file since they are both small components.                //
//--------------------------------------------------------------------------------------//

import React, { useEffect, useRef, useState } from 'react';
import Zoom from 'react-medium-image-zoom';
import useInView from '../../hooks/useInView';
import classNames from 'classnames';
import { useDarkMode } from '../../shared/DarkModeToggle/DarkModeContext';
import 'react-medium-image-zoom/dist/styles.css'; // source: https://www.npmjs.com/package/react-medium-image-zoom
import './ResumeContact.css';

// Icons: Hackathons
import attIcon from '../../images/att_icon.png';
import datafestIcon from '../../images/datafest_icon.png';
import sachacksIcon from '../../images/sachacks_icon.png';

// Icons: Languages
import htmlIcon from '../../images/html_icon.png';
import javascriptIcon from '../../images/javascript_icon.png';
import cppIcon from '../../images/c++_icon.png';
import dartIcon from '../../images/dart_icon.png';

// Icons: Tech Stack
import reactIcon from '../../images/react_icon.png';
import jiraIcon from '../../images/jira_icon.png';
import githubIcon from '../../images/github_icon.png';
import vsCodeIcon from '../../images/vscode_icon.png';
import flutterIcon from '../../images/flutter_icon.png';



const attributeListOne = [
  { text: 'AT&T: EmpowHer', icon: attIcon },
  { text: 'DataFest', icon: datafestIcon },
  { text: 'SacHacks', icon: sachacksIcon },
];


const attributeListTwo = [
  { text: 'HTML & CSS', icon: htmlIcon },
  { text: 'JavaScript', icon: javascriptIcon },
  { text: 'C++', icon: cppIcon },
  { text: 'Dart', icon: dartIcon },
];

const attributeListThree = [
  { text: 'GitHub', icon: githubIcon },
  { text: 'Jira', icon: jiraIcon },
  { text: 'React', icon: reactIcon },
  { text: 'Flutter', icon: flutterIcon },
  { text: 'VS Code', icon: vsCodeIcon },
];

function showAttributes() {
  const allLists = document.querySelectorAll('.attributes-list');
  let currentListIndex = 0;

  function processList() {
    // Hide all lists initially
    allLists.forEach(list => list.style.display = 'none');

    // Show only the current list
    const currentList = allLists[currentListIndex];
    currentList.style.display = 'block';

    // Select all .attribute elements in the current list
    const attributes = currentList.querySelectorAll('.attribute');
    attributes.forEach((attribute, index) => {
      // Immediately remove the hide class for fade-in effect
      setTimeout(() => {
        attribute.classList.remove('attribute-hide');
      }, 100 * index); // Staggered fade-in

      // Set timeout to add hide class, triggering fade out
      setTimeout(() => {
        attribute.classList.add('attribute-hide');
      }, 5000 + 100 * index);
    });

    // Set timeout for next list, including 400ms delay
    setTimeout(() => {
      // Move to the next list
      currentListIndex = (currentListIndex + 1) % allLists.length;
      processList();
    }, 5000 + 100 * attributes.length + 700); // Added 700ms delay between lists
  }

  processList();
}



function ResumeContact() {
  const { isDarkMode } = useDarkMode(); // Get the global state for dark mode 
  const [showPopup, setShowPopup] = useState(false); // State for showing the popup
  const [popupMessage, setPopupMessage] = useState(""); // State for the popup message
  const resumeRef = useRef(null); // Ref for resume section
  const contactRef = useRef(null); // Ref for contact section
  const isResumeInView = useInView(resumeRef, { threshold: [0.2], sectionName: 'resume-contact' } );
  const isContactInView = useInView(contactRef, { threshold: [0.2], sectionName: 'resume-contact' } );
  const resumeClass = classNames({
    'resume-wrapper': true,
    'animate-resume': isResumeInView,
    'dark-mode': isDarkMode 
  });
  const contactClass = classNames({
    'contact-container': true,
    'animate-contact': isContactInView,
    'dark-mode': isDarkMode 
  });
  const resumeHeaderClass = classNames({
    'resume-header': true,
    'animate-resume-header': isResumeInView,
    'dark-mode': isDarkMode
  });
  const contactHeaderClass = classNames({
    'contact-header': true,
    'big-screens-only': true,
    'animate-contact-header': isContactInView,
    'dark-mode': isDarkMode
  });

  useEffect(() => {
    showAttributes();
  }, []);

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

// UseEffect to show attributes
useEffect(() => {
  showAttributes();
}, []);

  return (
    <div className="resume-contact" id = "resume-contact">

      {/* Resume Section*/}
      <section className= 'resume' ref = {resumeRef}>
        <h2 className = {resumeHeaderClass}>Resume</h2>
        <div className={resumeClass}>
          <div className="resume__image__container">
            <Zoom>
              <img
                alt="Resume"
                src={'https://drive.google.com/uc?export=view&id=1gWuMa_hFEyR21zJy8zc6wYkRPVeenhc1'}
                style={{
                }}
              />
            </Zoom>
            <div className = "resume__image__magnifying-icon"></div>
          </div>

          {/* Resume Right Side */}
          <div className = "resume__right">
            {/* List: Hackathons */}
            <ul className="attributes-list">
            {attributeListOne.map((attribute, index) => (
              <li key={index} className="attribute">
                <img src={attribute.icon} alt="" className="attribute-icon" />
                <span className="attribute-text">{attribute.text}</span>
              </li>
            ))}
            </ul>

            {/* List: Languages */}
            <ul className="attributes-list">
            {attributeListTwo.map((attribute, index) => (
              <li key={index} className="attribute">
                <img src={attribute.icon} alt="" className="attribute-icon" />
                <span className="attribute-text">{attribute.text}</span>
              </li>
            ))}
            </ul>

            {/* List: Tech Stack */}
            <ul className="attributes-list">
            {attributeListThree.map((attribute, index) => (
              <li key={index} className="attribute">
                <img src={attribute.icon} alt="" className="attribute-icon" />
                <span className="attribute-text">{attribute.text}</span>
              </li>
            ))}
            </ul>

          </div>
        </div>
      </section>

      {/* Contact Section*/}
      <section className='contact' ref = {contactRef}>
        <h2 className = {contactHeaderClass}>Contact</h2>
        <div className={contactClass}>
        <form className="contact-form" name="contact" method="POST" onSubmit={handleFormSubmit} data-netlify="true">
          <input type="hidden" name="form-name" value="contact" />
          <div className="contact-name-and-email">
            <input type="text" id="name" name="name" placeholder="Name" autocomplete="name" className="contact-form-name" />
            <input type="email" id="email" name="email" placeholder="Email" autocomplete="email" className="contact-form-email"/>
          </div>
          <textarea id="message" name="message" className="contact-form-message" placeholder="Message"></textarea>
          <button className="contact-submit-button" type="submit">Send</button>
        </form>
        </div>
      </section>
      {showPopup && <Popup message={popupMessage} onClose={closePopup} />}
    </div>
  );

}

export default ResumeContact;
