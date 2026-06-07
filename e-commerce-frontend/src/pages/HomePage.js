import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';

function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector(
    (state) => state.auth.isAuthenticated
  );

  const user = useSelector(
    (state) => state.auth.user
  );

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-purple-700 text-white">
      
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-5 bg-black/20 backdrop-blur-md">
        <h1 className="text-3xl font-bold">🛒 E-Commerce Store</h1>

        <div className="flex items-center gap-4">
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

          {isAuthenticated ? (
            <>
              <span className="font-semibold">
                👋 Welcome {user?.name || 'User'}
              </span>

              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-white text-blue-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24">
        <h1 className="text-6xl font-extrabold mb-6">
          Welcome to Our Store
        </h1>

        <p className="text-xl max-w-2xl text-gray-100 mb-8">
          Discover amazing products, unbeatable prices, and a seamless
          shopping experience. Shop smarter with our modern E-Commerce
          platform.
        </p>

        <div className="flex gap-4">
          <Link
            to="/products"
            className="bg-white text-blue-700 px-8 py-3 rounded-xl font-bold text-lg hover:scale-105 transition"
          >
            Browse Products
          </Link>

          {!isAuthenticated && (
            <Link
              to="/register"
              className="bg-yellow-400 text-black px-8 py-3 rounded-xl font-bold text-lg hover:scale-105 transition"
            >
              Get Started
            </Link>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-8 px-10 py-16">
        <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-md">
          <h2 className="text-2xl font-bold mb-3">🚚 Fast Delivery</h2>
          <p>
            Get your products delivered quickly and safely to your doorstep.
          </p>
        </div>

        <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-md">
          <h2 className="text-2xl font-bold mb-3">💳 Secure Payments</h2>
          <p>
            Shop with confidence using our secure payment methods.
          </p>
        </div>

        <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-md">
          <h2 className="text-2xl font-bold mb-3">⭐ Best Quality</h2>
          <p>
            We offer top-quality products from trusted brands worldwide.
          </p>
        </div>
      </section>

      {/* Quick Links */}
      <section className="text-center py-12">
        <h2 className="text-4xl font-bold mb-8">
          Quick Navigation
        </h2>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/products"
            className="bg-white text-black px-6 py-3 rounded-xl font-semibold"
          >
            Products
          </Link>

          <Link
            to="/cart"
            className="bg-white text-black px-6 py-3 rounded-xl font-semibold"
          >
            Cart
          </Link>

          <Link
            to="/order-history"
            className="bg-white text-black px-6 py-3 rounded-xl font-semibold"
          >
            Order History
          </Link>

          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="bg-white text-black px-6 py-3 rounded-xl font-semibold"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-white text-black px-6 py-3 rounded-xl font-semibold"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-600"
            >
              Logout
            </button>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 bg-black/20">
        <p>© 2026 E-Commerce Store. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;