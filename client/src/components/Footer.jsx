import React from 'react'
import './HeaderFooter.css'
import { useLocation } from "react-router-dom";

const Footer = () => {

  const { pathname } = useLocation();
  console.log(pathname);
  if (pathname === "/login" || pathname === "/logout") return null;

  return (
    
        <footer>
          <p className="fontFira">Copyright @2022 Yoke | All Rights Reserved</p>
        </footer>
       
  )
}

export default Footer