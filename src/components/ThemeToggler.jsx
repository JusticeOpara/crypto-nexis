import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HiSun, HiMoon } from 'react-icons/hi';
import { setTheme } from '../store/theme-slice';



const ThemeToggler = () => {

    const dispatch = useDispatch();
    const currentTheme = useSelector((state) => state.theme.currentTheme);
    console.log(currentTheme, "--SetCurrentTheme")

    //   const toggleTheme = useCallback(() => {
    //     dispatch(setTheme(currentTheme === 'dark' ? 'light' : 'dark'));
    //   }, [dispatch, currentTheme]);
    //   () => setTheme(theme === 'dark' ? 'light' : 'dark')
    const toggleTheme = () => {
        dispatch(setTheme(currentTheme === "dark" ? "light" : "dark"))
        
    }

    return (
        <div className='p-2 w-fit mx-auto md:w-full'>
            {currentTheme === 'dark' ? (
                <div className='flex items-center cursor-pointer' onClick={toggleTheme}>
                    <HiSun className='text-primary text-center md:text-2xl mr-2' /> Light Mode
                </div>
            ) : (
                <div className='flex items-center cursor-pointer' onClick={toggleTheme}>
                    <HiMoon className='text-primary md:text-2xl mr-2' /> Dark Mode
                </div>
            )}
        </div>
    );
};



export default ThemeToggler;
