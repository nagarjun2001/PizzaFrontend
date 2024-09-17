import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaShoppingCart, FaSignOutAlt } from 'react-icons/fa';

function UNav() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('custid');
    navigate('/custlogin');
  };

  return (
    <nav className="bg-red-600 p-4 flex items-center justify-between shadow-md">
      <div className="text-white text-2xl font-bold">
        <Link to="/">Pizza Shop</Link>
      </div>
      <div className="flex items-center space-x-4">
        <Link to="/profile" className="text-white flex items-center hover:text-gray-200">
          <FaUserCircle size={24} />
          <span className="ml-2">Profile</span>
        </Link>
        <Link to="/cart" className="text-white flex items-center hover:text-gray-200">
          <FaShoppingCart size={24} />
          <span className="ml-2">Cart</span>
        </Link>
        <button
          onClick={handleLogout}
          className="text-white flex items-center hover:text-gray-200"
        >
          <FaSignOutAlt size={24} />
          <span className="ml-2">Logout</span>
        </button>
      </div>
    </nav>
  );
}

export default UNav;
