import React, { useState, useEffect } from 'react';
import { mockOrders } from '../mockData/orders';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../store/authSlice';

// Helper component to display individual order items
function OrderItem({ order }) {
  const formattedDate = new Date(order.orderDate).toLocaleDateString();

  return (
    <div className="bg-white rounded-2xl p-6 mb-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">

      <div className="flex justify-between items-center mb-4">
        <span className="font-bold text-lg text-gray-800">
          Order ID: #{order._id.substring(4)}
        </span>

        <span className="text-sm text-gray-500">
          {formattedDate}
        </span>
      </div>

      <div className="mb-4 space-y-2">
        {order.items.map((item) => (
          <p
            key={item.productId}
            className="text-gray-700"
          >
            {item.quantity} × {item.name}

            <span className="float-right font-semibold text-green-600">
              ${item.price.toFixed(2)}
            </span>
          </p>
        ))}
      </div>

      <div className="flex justify-between items-center pt-4 border-t">
        <span className="font-bold text-xl text-gray-800">
          Total: ${order.totalAmount.toFixed(2)}
        </span>

        <span className="text-sm font-medium py-2 px-4 rounded-full bg-green-100 text-green-800">
          {order.status}
        </span>
      </div>

    </div>
  );
}

function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = useSelector(
    selectIsAuthenticated
  );

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);

      try {
        // Simulate network delay
        await new Promise((resolve) =>
          setTimeout(resolve, 500)
        );

        setOrders(mockOrders);
      } catch (err) {
        console.error(
          'Failed to fetch orders:',
          err
        );
      } finally {
        setLoading(false);
      }
    };

    if (!isAuthenticated) {
      navigate('/login');
    } else {
      fetchOrders();
    }
  }, [isAuthenticated, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="text-2xl font-bold text-blue-600">
          Loading your orders...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 py-10">

      <div className="container mx-auto px-4 max-w-5xl">

        <h1 className="text-5xl font-bold text-center mb-10 text-gray-800">
          📦 Order History
        </h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
            <p className="text-2xl text-gray-600">
              You have no past orders.
            </p>
          </div>
        ) : (
          orders.map((order) => (
            <OrderItem
              key={order._id}
              order={order}
            />
          ))
        )}

      </div>

    </div>
  );
}

export default OrderHistoryPage;