import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../services/auth';

export default function Navbar({ user }) {
  const nav = useNavigate();
  return (
    <nav className="bg-white dark:bg-gray-800 p-4 shadow">
      <div className="container mx-auto flex justify-between">
        <div className="space-x-4">
          <Link to="/" className="text-blue-600 dark:text-blue-400 font-semibold">Dashboard</Link>
          <Link to="/settings" className="text-gray-600 dark:text-gray-300">Settings</Link>
        </div>
        <div>
          {user ? (
            <button onClick={() => logout().then(() => nav('/login'))} className="text-red-500">Logout</button>
          ) : (
            <Link to="/login" className="text-green-500">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}