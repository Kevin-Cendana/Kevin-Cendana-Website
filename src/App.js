//--------------------------------------------------------------------------------------//
//                                        App.js                                        //
//--------------------------------------------------------------------------------------//
/* main code for the website, where the routes (links) are defined and 
    the components (reusable code blocks) are imported */

import React, { } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';  
import './App.css';
import './normalize.css';
import Home from './Home/Home';

import About from './About/About';
import ResumeContact from './ResumeContact/ResumeContact';
import Projects from './Projects/Projects';
import DarkModeToggle from './NavigationBar/DarkModeToggle';
import NavigationBar from './NavigationBar/NavigationBar';

function App() {
  return (
    <Router>
        <NavigationBar />
        <div className="main-content">    
          <Home />
          <About />
          <Projects />
          <ResumeContact />
        </div>
        <footer></footer>
    </Router>
  );
}


export default App;
