/*--------------------------------------------------------------------------------------//
//                                  DarkModeContext.js                                  //
//--------------------------------------------------------------------------------------*/
// Store dark mode state in a context to be used throughout the app.

import React, { createContext, useState, useContext, useEffect } from 'react';
import { getCookie, setCookie } from './CookieUtils';

export const DarkModeContext = createContext();

export const useDarkMode = () => useContext(DarkModeContext);

export const DarkModeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(getCookie('dark-mode') === 'true');

    useEffect(() => {
        setCookie('dark-mode', isDarkMode, 365);
    }, [isDarkMode]);

    return (
        <DarkModeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
};
