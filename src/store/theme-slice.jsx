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
// intialState:{
//   mode:JSON.parse(localStorage.getItem("darkMode")) || false
// },


const themeSlice = createSlice({
  name: 'theme',

  initialState: {
    currentTheme: getInitialTheme(),
  },

  reducers: {
    setTheme(state, action) {
      state.currentTheme = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
