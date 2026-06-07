import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div className="text-center p-10">Loading...</div>;
  }

  return (
    <div className="p-10 flex gap-10">
      <img
        src={product.imageUrl || 'https://via.placeholder.com/400'}
        className="w-80 h-80 object-cover"
        alt={product.name}
      />

      <div>
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-xl text-green-600 mt-2">${product.price}</p>
        <p className="mt-4 text-gray-600">{product.description}</p>
      </div>
    </div>
  );
}

export default ProductDetailPage;