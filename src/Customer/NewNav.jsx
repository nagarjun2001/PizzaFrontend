import React from 'react';
import { Link } from 'react-router-dom';

const NewNav = ({ cartItemCount }) => {
  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-red-500">Pizza Shop</Link>
        <Link to="/cart" className="relative">
          <span className="text-gray-700">Cart</span>
          {cartItemCount > 0 && (
            <span className="absolute top-0 right-0 inline-block w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full text-center">
              {cartItemCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default NewNav;
