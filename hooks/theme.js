'use client';

import { hasCookie, getCookie, setCookie } from 'cookies-next';

import React from 'react';

const ThemeContext = React.createContext('light');
const ThemeUpdateContext = React.createContext(null);

export function useTheme(){
    return {
        theme: React.useContext(ThemeContext),
        setTheme: React.useContext(ThemeUpdateContext)
    }
}

export function ThemeProvider({children}){
    const [theme, setTheme] = React.useState(null);
    
    React.useEffect(() =>{
        setTheme(hasCookie('app-theme') ? getCookie('app-theme') === 'dark' ? 'dark' : 'light' : 'light');
    },[])
    
    const updateTheme = (value) =>{
        setCookie('app-theme', value)
        setTheme(value);
    }
    
    if(theme === null) return <body></body>;
    return(<body data-theme={theme === 'light' ? 'light' : 'dark'}>
        <ThemeContext.Provider value={theme}>
            <ThemeUpdateContext.Provider value={updateTheme}>
                {children}
            </ThemeUpdateContext.Provider>
        </ThemeContext.Provider>
    </body>)
}