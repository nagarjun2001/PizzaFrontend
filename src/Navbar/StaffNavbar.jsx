// import React from 'react';
// import toast from 'react-hot-toast';
// import { Link, useNavigate } from 'react-router-dom';

// const StaffNavbar = () => {

//   const navigate = useNavigate();

//   const handleLogout = () => {
//     sessionStorage.removeItem('staffId');
//     sessionStorage.removeItem('staffEmail');
//     toast.success('Logged out successfully!')
//     navigate('/stafflogin');
//   };
//   return (
//     <nav className="bg-blue-600 text-white p-4 shadow-md">
//       <div className="container mx-auto flex justify-between items-center">
//         <h1 className="text-2xl font-bold">Pizza Staff Dashboard</h1>
//         <div>
//           <Link to="/stafforders" className="mr-4 hover:text-gray-300">Pending Deliveries</Link>
//           <Link to="/completed" className="mr-4 hover:text-gray-300">Completed Deliveries</Link>
//           <Link to="/staffprofile" className="mr-4 hover:text-gray-300">Manage Profile</Link>
//           <button
//             onClick={handleLogout } 
//             className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
//           >
//             Logout
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default StaffNavbar;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/pizza.png";
import toast from "react-hot-toast";

const StaffNavbar = () => {
  const [menuState, setMenuState] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    toast.success('Logged out successfully!')
    navigate('/stafflogin');
  };

  return (
    <nav className="bg-white border-b shadow-md">
      <div className="flex items-center justify-between py-2 px-4 max-w-screen-xl mx-auto md:px-8">
        <div className="flex-1 flex items-center justify-center lg:justify-start">
          <Link to="/homepage">
            <img src={logo} width={50} height={50} alt="Logo" />
          </Link>
          <div className="text-lg">PizzaMan</div>
        </div>

        <div className="flex items-center space-x-4">
          <Link to="/stafforders" className="hover:text-red-600 px-4">
            Manage Deliveries
          </Link>
          <Link to="/staffinventory" className="hover:text-red-600 px-4">
            Manage Stock
          </Link>
          <Link to="/staffprofile" className="hover:text-red-600 px-4">
            Profile
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center space-x-1 text-gray-700 hover:text-red-600"
          >
            <span className="material-icons">logout</span>
            <span>Logout</span>
          </button>
        </div>

        <button
          className="outline-none text-gray-400 lg:hidden"
          onClick={() => setMenuState(!menuState)}
        >
          {menuState ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>
      </div>
    </nav>
  );
};

export default StaffNavbar;
