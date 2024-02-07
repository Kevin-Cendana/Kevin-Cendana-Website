//--------------------------------------------------------------------------------------//
//                                        App.js                                        //
//--------------------------------------------------------------------------------------//

import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import './normalize.css';
import Home from './components/Home/Home';
import About from './components/About/About';
import NavigationBar from './components/NavigationBar/NavigationBar';
import { DarkModeProvider } from './shared/DarkModeToggle/DarkModeContext.js';
import './StarsBackground.scss';

// Lazy load components that aren't seen first to improve initial load time
const Skills = React.lazy(() => import('./components/Skills/Skills'));
const Projects = React.lazy(() => import('./components/Projects/Projects'));
const Contact = React.lazy(() => import('./components/Contact/Contact'));

function App() {
  return (
    <Router>
      <DarkModeProvider>
        <div className="app">
          <NavigationBar />
          <div className="stars-container">
            <div id="stars"></div>
            <div id="stars2"></div>
            <div id="stars3"></div>
          </div>
          <main className="app-main-content">
            {/* Load Home and About first since they're the first components seen. */}
            <Home />
            <About />
            {/* Suspense for lazy loaded components */}
            <Suspense fallback={<div></div>}>
              <Skills />
              <Projects />
              <Contact />
            </Suspense>
          </main>
          <footer>
            <div className="footer-left">
              <p>© Kevin Cendana 2024</p>
            </div>
            <div className="footer-right"></div>
          </footer>
        </div>
      </DarkModeProvider>
    </Router>
  );
}

export default App;
