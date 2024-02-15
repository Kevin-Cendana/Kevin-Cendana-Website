// WindowLoadContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';

// Create a Context
const WindowLoadContext = createContext();

// Provider Component
export const WindowLoadProvider = ({ children }) => {
    const [isWindowLoaded, setIsWindowLoaded] = useState(false);


    //! Debugging: Comment out for production.
    //! On mount, cause a delay for window load to simulate a slower connection
    // useEffect(() => {
    //     const handleLoad = () => {
    //         setTimeout(() => {
    //             setIsWindowLoaded(true); // Delay window loaded state
    //         }, 5000); // 5000 ms delay for testing
    //     };
    
    //     window.addEventListener('load', handleLoad);
    
    //     // Cleanup
    //     return () => window.removeEventListener('load', handleLoad);
    // }, []);

    // On mount, add event listener to check if window is fully loaded
    useEffect(() => {
        const handleLoad = () => {
            setIsWindowLoaded(true); // Set to true once window is fully loaded
        };

        window.addEventListener('load', handleLoad);

        // Cleanup
        return () => window.removeEventListener('load', handleLoad);
    }, []);

    return (
        <WindowLoadContext.Provider value={isWindowLoaded}>
            {children}
        </WindowLoadContext.Provider>
    );
};

// Custom hook to use the window load state
export const useWindowLoad = () => useContext(WindowLoadContext);
