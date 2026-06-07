// src/pages/CartPage.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  getCartItems,
  selectCartItems,
  selectCartLoading,
  selectCartError,
  selectCartTotalItems,
  selectCartTotalPrice,
} from '../store/cartSlice';

function CartPage() {
  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);
  const loading = useSelector(selectCartLoading);
  const error = useSelector(selectCartError);
  const totalItems = useSelector(selectCartTotalItems);
  const totalPrice = useSelector(selectCartTotalPrice);

  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);

  // LOADING
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-xl font-bold">Loading Cart...</h1>
      </div>
    );
  }

  // ERROR
  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-600">
        {error}
      </div>
    );
  }

  // EMPTY CART
  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
        <h1 className="text-4xl font-bold mb-4">
          🛒 Cart is Empty
        </h1>

        <Link
          to="/products"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold text-center mb-8">
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT ITEMS */}
          <div className="lg:col-span-2 space-y-5">

            {cartItems.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl shadow-md p-5 flex flex-col md:flex-row gap-5"
              >

                <img
                  src={
                    item.image ||
                    item.product?.imageUrl ||
                    'https://via.placeholder.com/150'
                  }
                  alt={item.name}
                  className="w-full md:w-40 h-40 object-cover rounded-xl"
                />

                <div className="flex-1">

                  <h2 className="text-xl font-bold">
                    {item.name || item.product?.name}
                  </h2>

                  <p className="text-green-600 font-semibold mt-2">
                    ₹{item.price || item.product?.price}
                  </p>

                  <p className="mt-3">
                    Quantity:
                    <span className="font-bold ml-2">
                      {item.qty}
                    </span>
                  </p>

                  <p className="mt-3 font-bold">
                    Subtotal: ₹
                    {(
                      (item.price || item.product?.price) *
                      item.qty
                    ).toFixed(2)}
                  </p>

                </div>

              </div>
            ))}

          </div>

          {/* RIGHT SUMMARY */}
          <div>

            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">

              <h2 className="text-2xl font-bold mb-6">
                Order Summary
              </h2>

              <div className="flex justify-between mb-4">
                <span>Total Items</span>
                <span>{totalItems}</span>
              </div>

              <div className="border-t pt-4 flex justify-between text-xl font-bold">
                <span>Total</span>
                <span className="text-green-600">
                  ₹{totalPrice.toFixed(2)}
                </span>
              </div>

              <button className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700">
                Checkout
              </button>

              <Link
                to="/products"
                className="block text-center mt-4 text-blue-600"
              >
                Continue Shopping
              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default CartPage;