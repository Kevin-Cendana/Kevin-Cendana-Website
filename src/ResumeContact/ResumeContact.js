//--------------------------------------------------------------------------------------//
//                                   ResumeContact.js                                   //
//                Both in one file since they are both small components.                //
//--------------------------------------------------------------------------------------//

import React from 'react';
import DarkModeToggle from '../NavigationBar/DarkModeToggle';
import './ResumeContact.css';

function ResumeContact() {
  return (
    <div className="resume-contact" id = "resume-contact">
      <div className="resume">
        <div className="resume-header">
          <h2>Resume</h2>
          <div className = "resume-icon"></div>
          <button onClick="location.href='https://docs.google.com/document/d/1xiAtzAXNMSw3ZkajAZaag-O40Fxn4iWoJ1nj-sb5YCA/export?format=pdf'" className="resume-button download"></button>
          <button onClick="window.open('https://docs.google.com/document/d/1xiAtzAXNMSw3ZkajAZaag-O40Fxn4iWoJ1nj-sb5YCA/edit?usp=sharing', '_blank')" className="resume-button new-window"></button>
          </div>
      </div>
      <div className="contact">
        <h2>Contact</h2>
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
      </div>
    </div>
  );

}

export default ResumeContact;
