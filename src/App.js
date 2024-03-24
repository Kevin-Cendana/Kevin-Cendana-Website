//--------------------------------------------------------------------------------------//
//                                        App.js                                        //
//--------------------------------------------------------------------------------------//

// Libraries & Files
import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { DarkModeProvider } from './shared/DarkModeToggle/DarkModeContext.js';
import './App.css';
import './AppColors.css';
import './normalize.css';

// Sections of the website that are visible on the first load
import NavigationBar from './components/NavigationBar/NavigationBar';
import Home from './components/Home/Home';
import About from './components/About/About';

// Lazy load sections that aren't seen first to improve initial load time
const Skills = React.lazy(() => import('./components/Skills/Skills'));
const Projects = React.lazy(() => import('./components/Projects/Projects'));
const Contact = React.lazy(() => import('./components/Contact/Contact'));
const Footer = React.lazy(() => import('./components/Footer/Footer'));

function App() {

  // On mount: Sequentially load Skills, Projects, Contact, Footer
  useEffect(() => {
    const preloadSkills = import('./components/Skills/Skills');
    preloadSkills.then(() => {
      const preloadProjects = import('./components/Projects/Projects');
      preloadProjects.then(() => {
        const preloadContact = import('./components/Contact/Contact');
        preloadContact.then(() => {
          import('./components/Footer/Footer');
        });
      });
    });
  }, []);

  // Render the website
  return (
    <Router> 
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
          <Footer />
        </div>
    </DarkModeProvider>
    </Router>
    
  );
}

export default App;
