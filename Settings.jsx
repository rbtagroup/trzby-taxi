import React, { useEffect, useState } from 'react';

export default function Settings() {
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark');
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Nastavení</h1>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <label className="flex items-center space-x-4">
          <span className="text-gray-700 dark:text-gray-300">Dark mode</span>
          <input type="checkbox" checked={dark} onChange={() => setDark(!dark)} className="toggle" />
        </label>
      </div>
    </div>
  );
}