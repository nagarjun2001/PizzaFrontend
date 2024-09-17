import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Fa500Px, FaBluetooth, FaHome, FaOutdent, FaSign, FaSignInAlt, FaSignOutAlt, FaUpload, FaUser } from 'react-icons/fa';
import logo from '../images/ytlogo.png'

const ALogNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
    const handleLogout = () => {
        sessionStorage.removeItem("adminId");
        navigate("/adminlogin");
    };


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`relative top-0 left-0 w-full p-4 flex items-center justify-between bg-opacity-50 transition-colors duration-300 ease-in-out backdrop-blur-lg ${
        scrolled ? 'bg-gray-900' : 'bg-transparent'
      } z-50`}
    >
      <div className="text-white text-2xl font-bold">
        <Link to="/" className="hover:text-gray-300 transition-colors">
          <img src={logo} width={40} alt="" />
        </Link>
      </div>
      <ul className="hidden md:flex space-x-6">
        <li>
          <Link
            to="/home"
            className="flex items-center text-white hover:text-gray-300 transition-transform transform hover:scale-105"
          >
            <FaHome className="mr-2" />
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/upload"
            className="flex items-center text-white hover:text-gray-300 transition-transform transform hover:scale-105"
          >
            <FaUpload className="mr-2" />
            Upload
          </Link>
        </li>
        <li>
          <Link
            to="/adminlogin" onClick={handleLogout}
            className="flex items-center text-white hover:text-gray-300 transition-transform transform hover:scale-105"
          >
            <FaSignOutAlt className="mr-2"/>
            Logout
          </Link>
        </li>
      </ul>
      <div className="md:hidden flex items-center">
        <button className="text-white hover:text-gray-300 focus:outline-none">
          <div className="w-6 h-0.5 bg-white mb-1"></div>
          <div className="w-6 h-0.5 bg-white mb-1"></div>
          <div className="w-6 h-0.5 bg-white"></div>
        </button>
      </div>
    </nav>
  );
};

export default ALogNav;
