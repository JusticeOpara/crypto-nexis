import { configureStore } from '@reduxjs/toolkit';
import themeSlice from './themeSlice';
import authSlice from './authSlice';

const store = configureStore({
  reducer: {
    // auth: authReducer,
    auth: authSlice,
    theme: themeSlice
  },
});

export default store;


