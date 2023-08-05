import { createSlice } from '@reduxjs/toolkit'

export const themeSlice = createSlice({
    name: 'theme',

    initialState: {
        themeMode: "light"
    },

    reducers: {
        changeTheme: (state, action) => {
            state.themeMode = action.payload
        }
    }
})

export const { changeTheme } = themeSlice.actions;

export default themeSlice.reducer;