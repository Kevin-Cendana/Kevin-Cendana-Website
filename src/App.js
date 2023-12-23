//--------------------------------------------------------------------------------------//
//                                        App.js                                        //
//--------------------------------------------------------------------------------------//
/* main code for the website, where the routes (links) are defined and 
    the components (reusable code blocks) are imported */

import React, { } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';  
import './App.css';
import './normalize.css';
import Home from './components/Home/Home';

import About from './components/About/About';
import ResumeContact from './components/ResumeContact/ResumeContact';
import Projects from './components/Projects/Projects';
import Skills from './components/Skills/Skills';
import DarkModeToggle from './shared/DarkModeToggle/DarkModeToggle.js';
import DebugWindowDimensions from './shared/DebugWindowDimensions.js';
import NavigationBar from './components/NavigationBar/NavigationBar';
import './StarsBackground.scss';

function App() {
  return (
    <Router>
      <div className="app">
        <DebugWindowDimensions />
        <NavigationBar />
          <div id="stars"></div>
          <div id="stars2"></div>
          <div id="stars3"></div>
        <div className="app-main-content">
          <Home />
          <About />
          <Skills />
          <Projects />
          <ResumeContact />
        </div>
        <footer>
          <div className = "footer-left">
            <p>© Kevin Cendana 2024</p>
          </div>
          <div className = "footer-right"></div>
        </footer>
      </div>
    </Router>
  );
}


export default App;
