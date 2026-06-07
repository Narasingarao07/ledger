import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold hover:text-yellow-300"
          >
            🛒 E-Commerce
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">

            <Link
              to="/"
              className="hover:text-yellow-300 transition"
            >
              Home
            </Link>

            <Link
              to="/products"
              className="hover:text-yellow-300 transition"
            >
              Products
            </Link>

            <Link
              to="/cart"
              className="hover:text-yellow-300 transition"
            >
              Cart
            </Link>

            <Link
              to="/order-history"
              className="hover:text-yellow-300 transition"
            >
              Orders
            </Link>

            <Link
              to="/login"
              className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300"
            >
              Register
            </Link>

          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;