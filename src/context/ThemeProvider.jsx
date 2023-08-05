import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTheme } from '../store/themeSlice';


const getInitialTheme = () => {
    // ... (same as before)
    if (typeof window !== 'undefined' && window.localStorage) {
        const storedPrefs = window.localStorage.getItem('color-theme')
        console.log(storedPrefs,"--localStorage-Theme")
        if (typeof storedPrefs === 'string') {
            return storedPrefs
        }

        const userMedia = window.matchMedia('(prefers-color-scheme: dark')
        if (userMedia.matches) {
            return 'dark'
        }
    }
    return 'light'

};



const ThemeProvider = ({ initialTheme, children }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const theme = initialTheme || getInitialTheme();
        console.log(theme,"--theme[initialtheme]||getIntialTheme")
        dispatch(setTheme(theme));
    }, [dispatch, initialTheme]);

    return (
        <>
            {children}
        </>
    );
};

export default ThemeProvider;
