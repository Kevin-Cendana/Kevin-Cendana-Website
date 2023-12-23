//--------------------------------------------------------------------------------------//
//                                   ResumeContact.js                                   //
//                Both in one file since they are both small components.                //
//--------------------------------------------------------------------------------------//

import React, { useEffect } from 'react';
import Zoom from 'react-medium-image-zoom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faAnchor, faAppleAlt, faBolt } from '@fortawesome/free-solid-svg-icons'; // Import the icons you need
import 'react-medium-image-zoom/dist/styles.css'; // source: https://www.npmjs.com/package/react-medium-image-zoom
import DarkModeToggle from '../../shared/DarkModeToggle/DarkModeToggle';
import './ResumeContact.css';
import resumeImage from '../../images/resume.png';

const attributeListOne = [
  { text: 'attribute1', icon: faCoffee },
  { text: 'attribute2', icon: faAnchor }
];

const attributeListTwo = [
  { text: 'attribute3', icon: faAppleAlt },
  { text: 'attribute4', icon: faBolt }
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

    const attributes = currentList.querySelectorAll('.attribute');
    attributes.forEach((attribute, index) => {
      // Reset hide class for each attribute
      attribute.classList.remove('hide');

      // Set timeout to add hide class
      setTimeout(() => {
        attribute.classList.add('hide');
      }, 6000 + 300 * index);
    });

    // Set timeout for next list
    setTimeout(() => {
      // Move to the next list
      currentListIndex = (currentListIndex + 1) % allLists.length;
      processList();
    }, 6000 + 300 * attributes.length);
  }

  processList();
}

function ResumeContact() {
  const handleDownloadClick = () => {
    // This will change the current window location to the PDF export link.
    window.location.href = 'https://docs.google.com/document/d/1xiAtzAXNMSw3ZkajAZaag-O40Fxn4iWoJ1nj-sb5YCA/export?format=pdf';
  };

  // Here, I define another function for the new window button click.
  const handleNewWindowClick = () => {
    // This will open the Google Doc in a new tab.
    window.open('https://docs.google.com/document/d/1xiAtzAXNMSw3ZkajAZaag-O40Fxn4iWoJ1nj-sb5YCA/edit?usp=sharing', '_blank');
  };

  useEffect(() => {
    showAttributes();
  }, []);
  return (
    <div className="resume-contact" id = "resume-contact">

      {/* Resume Section*/}
      <section className="resume">
        <h2 className = "resume-header">Resume</h2>
        <div className="resume-wrapper">
          <div className="resume__image__container">
            <Zoom>
              <img
                alt="Resume"
                src={resumeImage}
                style={{
                }}
              />
            </Zoom>
            <div className = "resume__image__magnifying-icon"></div>
              {/* Resume Download & Open in a new window Buttons */}
              {/* <button onClick={handleDownloadClick} className="resume-button download"></button>
              <button onClick={handleNewWindowClick} className="resume-button new-window"></button> */}
          </div>

          {/* Attribute slide out - lists skills like HTML, CSS, JS, etc.) */}
          <div className = "resume-slide-out">
            {/* List: General Profile */}
            <ul className="attributes-list">
            {attributeListOne.map((attribute, index) => (
              <li key={index} className="attribute">
                <FontAwesomeIcon icon={attribute.icon} /> {/* Icon for each attribute */}
                <span className="attribute-text">attribute1</span>
              </li>
            ))}
            </ul>
            {/* List: Tech Stack */}
            <ul className="attributes-list">
              {attributeListTwo.map((attribute, index) => (
                <li key={index} className="attribute">
                  <FontAwesomeIcon icon={attribute.icon} />
                  <span className="attribute-text">attribute1</span>
                </li>
              ))}
            </ul>
            {/* List: Coding Languages */}
            <ul className="attributes-list">
              {attributeListTwo.map((attribute, index) => (
                <li key={index} className="attribute">
                  <FontAwesomeIcon icon={attribute.icon} />
                  <span className="attribute-text">attribute1</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Contact Section*/}
      <section className="contact">
        <h2 className = "contact-header">Contact</h2>
        <div className="contact-container">
          <form className="contact-form" name="contact" method="POST" data-netlify="true" >
            <div className="input-group">
              <input type="text" name="name" placeholder="Name" />
              <input type="email" name="email" placeholder="Email" />
            </div>
            <textarea name="message" placeholder="Message"></textarea>
            <button className = "contact-submit-button" type="submit">Send</button>
          </form>
        </div>
      </section>

    </div>
  );

}

export default ResumeContact;
