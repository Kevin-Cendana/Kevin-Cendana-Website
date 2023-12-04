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
import Contact from './Contact/Contact';
import Projects from './Projects/Projects';
import DarkModeToggle from './NavigationBar/DarkModeToggle';
import NavigationBar from './NavigationBar/NavigationBar';

function App() {
  return (
    <Router>
        <div className="main-content">
          <NavigationBar />
          <Home />
          <About />
          <Projects />
          <Contact />
        </div>
        <footer></footer>
    </Router>
  );
}


export default App;
