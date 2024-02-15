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
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';
import { DarkModeProvider } from './shared/DarkModeToggle/DarkModeContext.js';
import { WindowLoadProvider } from './shared/WindowLoadContext.js';

// Lazy load components that aren't seen first to improve initial load time
// const Skills = React.lazy(() => import('./components/Skills/Skills'));
// const Projects = React.lazy(() => import('./components/Projects/Projects'));
// const Contact = React.lazy(() => import('./components/Contact/Contact'));

function App() {
  return (
    
    <Router>
    <WindowLoadProvider>
    <DarkModeProvider>
        <div className="app">
          <NavigationBar />
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
    </WindowLoadProvider>
    </Router>
    
  );
}

export default App;
