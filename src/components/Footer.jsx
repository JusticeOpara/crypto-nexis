import React from 'react'
import {useState,useEffect} from "react"

const defaultYear = 2023;
const currentYear = new Date().getFullYear();


const Footer = () => {
  const [year] = useState(currentYear);
  const [footerYear, setFooterYear] = useState(defaultYear);

  useEffect(() => {
    const timeline = `${defaultYear} - ${year}`;
    const copyrightYear = year > defaultYear ? timeline : defaultYear;
    setFooterYear(copyrightYear);
  }, [year]);

  return (

    <div className='max-w-[1140px] mx-auto mt-10'>
      Copyright © {footerYear} { }
      <a href="https://github.com/JusticeOpara" target="_blank" rel="noopener noreferrer">
        JustScript
      </a>
    </div >
  )
}

export default Footer

