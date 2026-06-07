import React from 'react';
import LoginForm from '../components/LoginForm';

function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-purple-700 flex items-center justify-center p-4">

      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden">

        <div className="flex flex-col md:flex-row">

          {/* Left Side */}
          <div className="md:w-1/2 bg-gradient-to-br from-blue-700 to-purple-700 text-white p-10 flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Welcome Back 👋
            </h1>

            <p className="text-lg text-blue-100 mb-6">
              Login to access your cart, orders, wishlist, and exclusive deals.
            </p>

            <div className="space-y-4">
              <div className="bg-white/10 p-4 rounded-xl">
                🚚 Fast Delivery
              </div>

              <div className="bg-white/10 p-4 rounded-xl">
                🔒 Secure Payments
              </div>

              <div className="bg-white/10 p-4 rounded-xl">
                ⭐ Premium Products
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="md:w-1/2 flex items-center justify-center p-8 md:p-12">
            <div className="w-full max-w-md">
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                Sign In
              </h2>

              <LoginForm />
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default LoginPage;