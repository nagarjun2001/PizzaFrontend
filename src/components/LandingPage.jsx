import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logoHD.jpg';

const LandingPage = () => {
  return (
    <>
      {/* Navbar for Customers */}
      <nav className="bg-white text-gray-900 shadow-md">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          <Link to="/">
            <img
              src={logo}
              alt="PizzaMan Logo"
              className="w-12 h-12 rounded-full object-cover" />
          </Link>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search..."
              className="py-2 px-4 border border-gray-300 rounded-lg"
            />
            <Link to="/adminlogin" className="bg-red-600 text-white py-2 px-4 rounded-full text-base font-semibold shadow-md hover:bg-red-700 transition-all">Admin Login</Link>
            <Link to="/customerreg" className="bg-red-600 text-white py-2 px-4 rounded-full text-base font-semibold shadow-md hover:bg-red-700 transition-all">Register</Link>
            <Link to="/custlogin" className="bg-red-600 text-white py-2 px-4 rounded-full text-base font-semibold shadow-md hover:bg-red-700 transition-all">Login</Link>
            <Link to="/stafflogin" className="bg-red-600 text-white py-2 px-4 rounded-full text-base font-semibold shadow-md hover:bg-red-700 transition-all">Staff Login</Link>
          </div>
        </div>
      </nav>
      {/* Hero Section */}
      <section className="relative h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://image.freepik.com/free-photo/pizza-pepperoni-on-table_1150-16904.jpg')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative container mx-auto flex flex-col items-center justify-center h-full text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to PizzaMan</h1>
          <p className="text-lg md:text-xl mb-6">Delicious Pizza, Fast Delivery, Great Value</p>
          <Link to="/order" className="bg-red-600 text-white py-3 px-6 rounded-full text-lg font-semibold shadow-lg hover:bg-red-700 transition-all">Order Now</Link>
        </div>
      </section>

      {/* Offers Section */}
      <section className="py-12 px-6 bg-red-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Special Offers</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {/* Offer Cards */}
            {/* ... */}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature Cards */}
            {/* ... */}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-12 px-6 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">What Our Customers Say</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {/* Review Cards */}
            {/* ... */}
          </div>
        </div>
      </section>

      {/* Order Section */}
      <section id="order" className="py-12 px-6 bg-red-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Ready to Place Your Order?</h2>
          <p className="text-lg mb-8">Experience the best pizza in town, delivered straight to your door. Click below to get started!</p>
          <Link to="/order" className="bg-white text-red-600 py-3 px-6 rounded-full text-lg font-semibold shadow-lg hover:bg-gray-100 transition-all">Order Now</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-4">
        <div className="container mx-auto text-center">
          <div className="mb-4">
            <Link to="/order" className="text-red-400 hover:text-red-300 transition-all">Order Now</Link> |
            <Link to="/features" className="text-red-400 hover:text-red-300 transition-all mx-4">Features</Link> |
            <Link to="/reviews" className="text-red-400 hover:text-red-300 transition-all">Reviews</Link>
          </div>
          <p>&copy; 2024 PizzaMan. All rights reserved.</p>
          <p className="text-sm">123 Pizza Lane, Flavor Town, FT 12345 | <a href="mailto:info@pizzaman.com" className="text-red-400 hover:text-red-300">info@pizzaman.com</a></p>
        </div>
      </footer>
    </>
  );
};

export default LandingPage;
