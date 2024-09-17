import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/pizza.png';

const CustomerNavbar = () => {
    const [menuState, setMenuState] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear all session items
        sessionStorage.clear();
        // Redirect to login page
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
                    <Link to="/cart" className="flex items-center space-x-1 text-gray-700 hover:text-red-600">
                        <span className="material-icons">shopping_cart</span>
                        <span>Cart</span>
                    </Link>
                    <Link to="/orders" className="flex items-center space-x-1 text-gray-700 hover:text-red-600">
                        <span className="material-icons">list_alt</span>
                        <span>My Orders</span>
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
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    )}
                </button>
            </div>
        </nav>
    );
};

export default CustomerNavbar;
