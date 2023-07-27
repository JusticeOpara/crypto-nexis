// ThemeProvider.js
import React, { useEffect, createContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from './themeSlice';

const getInitialTheme = () => {
  // ... (Same as before)
};

export const ThemeContext = createContext();

export const ThemeProvider = ({ initialTheme, children }) => {
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const rawSetTheme = (theme) => {
    dispatch(setTheme(theme));
  };

  if (initialTheme) {
    rawSetTheme(initialTheme);
  }

  useEffect(() => {
    rawSetTheme(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme: rawSetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
