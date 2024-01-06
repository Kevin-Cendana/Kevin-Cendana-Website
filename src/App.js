//--------------------------------------------------------------------------------------//
//                                        App.js                                        //
//--------------------------------------------------------------------------------------//

// Libraries & Files
import React, { } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';  
import './App.css';
import './normalize.css';
import Home from './components/Home/Home';
import About from './components/About/About';
import ResumeContact from './components/ResumeContact/ResumeContact';
import Projects from './components/Projects/Projects';
import Skills from './components/Skills/Skills';
import { DarkModeProvider } from './shared/DarkModeToggle/DarkModeContext.js';
import NavigationBar from './components/NavigationBar/NavigationBar';
import './StarsBackground.scss';

// Debugging - Comment this out for production
//import DebugWindowDimensions from './shared/DebugWindowDimensions.js';

// Main App
function App() {
  return (
    <Router>
      {/* <DarkModeProvider to give global dark mode */}
      <DarkModeProvider>
      <div className="app">
        {/* Debugging - Comment this out for production */}
        {/* <DebugWindowDimensions /> */}
        <NavigationBar />
          <div className="stars-container">
            <div id="stars"></div>
            <div id="stars2"></div>
            <div id="stars3"></div>
          </div>
        {/* Main content of the app.  */}
        <main className="app-main-content">
          <Home />
          <About />
          <Skills />
          <Projects />
          <ResumeContact />
        </main>
        {/* Footer */}
        <footer>
          <div className = "footer-left">
            <p>© Kevin Cendana 2024</p>
          </div>
          <div className = "footer-right">
          </div>
        </footer>
      </div>
      </DarkModeProvider>
    </Router>
  );
}


export default App;
