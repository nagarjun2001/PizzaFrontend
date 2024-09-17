import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/pizza.png';

const AdminLogNav = () => {
    const [menuState, setMenuState] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/custlogin');
    };

    return (
        <nav className="bg-white border-b shadow-md">
            <div className="flex items-center justify-between py-2 px-4 max-w-screen-xl mx-auto md:px-8">
                <div className="flex-1 flex items-center justify-center lg:justify-start">
                    <Link to="/homepage">
                        <img src={logo} width={50} height={50} alt="Logo" />
                    </Link>
                    <div className='text-lg'>
                        PizzaMan
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                <Link to="#" onClick={() => window.history.back()} className="inline-flex items-center text-white-800 hover:text-blue-700">
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6 mr-2"
    >
      <path
        d="M15 19l-7-7 7-7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    <span>Go Back</span>
  </Link>
                    
                </div>
            </div>
        </nav>
    );
};

export default AdminLogNav;