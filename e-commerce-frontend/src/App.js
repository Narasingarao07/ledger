import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import HomePage from './pages/HomePage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';
import OrderHistoryPage from './pages/OrderHistoryPage';

import { selectIsAuthenticated } from './store/authSlice';
import { getCartItems } from './store/cartSlice';

function ProtectedRoute({ element }) {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return isAuthenticated
    ? element
    : <Navigate to="/login" replace />;
}

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getCartItems());
    }
  }, [dispatch, isAuthenticated]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/products"
          element={<ProductListPage />}
        />

        <Route
          path="/products/:id"
          element={<ProductDetailPage />}
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />

        <Route
          path="/cart"
          element={<CartPage />}
        />

        <Route
          path="/order-history"
          element={
            <ProtectedRoute
              element={<OrderHistoryPage />}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;