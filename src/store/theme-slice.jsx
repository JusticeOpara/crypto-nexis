// themeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const getInitialTheme = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedPrefs = window.localStorage.getItem('color-theme');
    if (typeof storedPrefs === 'string') {
      return storedPrefs;
    }

    const userMedia = window.matchMedia('(prefers-color-scheme: dark)');
    if (userMedia.matches) {
      return 'dark';
    }
  }
  return 'light';
};

const themeSlice = createSlice({
  name: 'theme',
  initialState: getInitialTheme(),
  reducers: {
    setTheme: (state, action) => {
      const theme = action.payload;
      state = theme;
      const root = window.document.documentElement;
      const isDark = theme === 'dark';

      root.classList.remove(isDark ? 'light' : 'dark');
      root.classList.add(theme);

      localStorage.setItem('color-theme', theme);
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
