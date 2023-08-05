import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import { UserAuth } from '../context/AuthContext'
import { FaBitcoin } from 'react-icons/fa'
import { changeTheme } from '../store/themeSlice'
import { useSelector, useDispatch } from 'react-redux'
import { Switch } from "antd";



const Navbar = () => {
    const themeMode = useSelector((state) => state.theme.themeMode)

    const dispatch = useDispatch();
    const [theme, setTheme] = useState(null)
    const { user, logout } = UserAuth()
    const [nav, setNav] = useState(false)
    const navigate = useNavigate

    const handleNav = () => {
        setNav(!nav)
    }

    const handleSignOut = async () => {
        try {
            await logout()
            navigate('/')
        } catch (e) {
            console.log(e.message)
        }
    }

    const handleThemeChange = (value) => {
        const mode = value ? "dark" : "light";

        localStorage.setItem("themeMode", JSON.stringify(mode));
        setTheme(mode);
    };

    useEffect(() => {
        let currentTheme = JSON.parse(localStorage.getItem("themeMode"));
        console.log(currentTheme, "--currentTheme")

        dispatch(changeTheme(currentTheme ? currentTheme : "light"));

        // eslint-disable-next-line
    }, [theme]);

    return (
        <div className=' flex items-center justify-between h-20 font-bold shadow-lg '>
            <Link to='/'>
                <h1 className='text-2xl flex items-center '> Cryptocère<span className='ml-2 text-yellow-500'> <FaBitcoin /> </span> </h1>
            </Link>

            <div className='hidden md:block shadow'>

                <Switch
                    checked={themeMode === "dark" }
                    onChange={handleThemeChange}
                    checkedChildren="Dark"
                    unCheckedChildren="Light"
                   
                />

            </div>

            {user?.email ? (
                <div className='hidden md:block'>
                    <Link to='/account' className='p-4'> Account </Link>
                    <button onClick={handleSignOut}> Sign out</button>
                </div>
            ) : (
                <div className='hidden md:block'>
                    <Link to='/login' className='p-4 hover:text-accent'>Login</Link>
                    <Link to='/signup' className='bg-button text-btnText px-5 py-2 rounded-2xl shadow-lg hover:shadow-2xl' >Sign Up</Link>
                </div>)}

            {/* menu icon */}
            <div onClick={handleNav} className=' md:hidden cursor-pointer z-10'>
                {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={23} />}
            </div>


            <div className={nav ? 'leading-loose text-center text-xl absolute left-0 top-0 w-full mx-auto z-10 flex h-full mt-20 bg-primary ease-in-out flex-col' : 'absolute left-[-100%]'
            }>
                <ul onClick={handleNav} className='w-full p-4 mt-[20%] '>
                    <li className='w-fit mx-auto '>
                        <Switch
                            checked={themeMode === "dark"}
                            onChange={handleThemeChange}
                            checkedChildren="Dark"
                            unCheckedChildren="Light"
                        />
                    </li>
                    <li className='w-fit mx-auto'> <Link to='/'> Home </Link> </li>
                    {/* <li className='border-b py-6'> <Link to='/account'> Account </Link> </li> */}

                </ul>

                <div className='flex flex-col w-full'>
                    {user?.email ? (
                        <div onClick={handleNav} className='flex flex-col'>
                            <Link to='/account' className='  w-fit mx-auto'>Account </Link>
                            <button onClick={handleSignOut} className='p-4 w-fit mx-auto'> Sign out</button>
                        </div>
                    ) : (
                        <div onClick={handleNav} className='md:hidden flex flex-col  '>
                            <Link to='/signin' className='p-4 hover:text-accent w-fit mx-auto'>Sign In</Link>
                            <Link to='/signup' className='bg-button text-btnText px-10 items-center mt-4 py-[1px] w-fit mx-auto rounded-xl shadow-lg hover:shadow-2xl' >Sign Up</Link>
                        </div>)}
                </div>
            </div>

        </div>
    )
}

export default Navbar