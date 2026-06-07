import React, { useState } from 'react';
import axios from 'axios';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password,
      });

      alert('Registered successfully');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <div className="p-10 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Register</h1>

      <form onSubmit={handleRegister} className="flex flex-col gap-3">
        <input className="border p-2" placeholder="Name" onChange={(e) => setName(e.target.value)} />
        <input className="border p-2" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input className="border p-2" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

        <button className="bg-green-600 text-white p-2">
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;