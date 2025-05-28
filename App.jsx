import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Navbar from './components/Navbar';
import { onAuthStateChanged } from './services/auth';

export default function App() {
  const [user, setUser] = useState(undefined);

  useEffect(() => onAuthStateChanged(setUser), []);

  if (user === undefined) return null;

  return (
    <BrowserRouter>
      <div className={user ? 'dark' : ''}>
        <Navbar user={user} />
        <Routes>
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/settings" element={user ? <Settings /> : <Navigate to="/login" />} />
          <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}