import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const nav = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    if (!email || !password) {
      setError('Vyplňte všechny pole.');
      return;
    }
    login(email, password)
      .then(() => nav('/'))
      .catch(() => setError('Neplatné přihlašovací údaje'));
  };

  return (
    <div className="flex items-center justify-center h-screen p-4">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-blue-600">Přihlášení</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <label className="block mb-2">
          Email
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-1 w-full p-2 border rounded" />
        </label>
        <label className="block mb-4">
          Heslo
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="mt-1 w-full p-2 border rounded" />
        </label>
        <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded">Login</button>
      </form>
    </div>
  );
}