import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          'http://localhost:5000/api/products'
        );

        setProducts(res.data);
      } catch (err) {
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl">
        Loading Products...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center mt-10">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold mb-8 text-center">
          Our Products
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
            >
              <img
                src={
                  product.imageUrl ||
                  'https://via.placeholder.com/300x250'
                }
                alt={product.name}
                className="w-full h-56 object-cover"
              />

              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">
                  {product.name}
                </h2>

                <p className="text-gray-600 mb-3 line-clamp-2">
                  {product.description}
                </p>

                <p className="text-green-600 text-xl font-bold mb-4">
                  ${product.price}
                </p>

                <Link
                  to={`/products/${product._id}`}
                  className="block text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default ProductListPage;