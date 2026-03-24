import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';

const Navigation: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { isDark, setTheme, theme } = useTheme();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="text-xl font-bold text-indigo-600">Home</Link>
          <div className="hidden md:flex items-center gap-4">
            <Link to="/pricing" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600">Pricing</Link>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600">Dashboard</Link>
                <Link to="/billing" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600">Billing</Link>
                <button onClick={handleLogout} className="text-gray-600 dark:text-gray-300 hover:text-indigo-600">Sign Out</button>
              </>
            ) : (
              <>
                <Link to="/signin" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600">Sign In</Link>
                <Link to="/signup" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">Sign Up</Link>
              </>
            )}
            <button onClick={() => setTheme(isDark ? 'light' : 'dark')} className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
              {isDark ? 'Light' : 'Dark'}
            </button>
          </div>
          <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            <span className="text-gray-600 dark:text-gray-300 text-2xl">{mobileOpen ? 'X' : '='}</span>
          </button>
        </div>
        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link to="/pricing" className="block text-gray-600 dark:text-gray-300 py-2">Pricing</Link>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="block text-gray-600 dark:text-gray-300 py-2">Dashboard</Link>
                <Link to="/billing" className="block text-gray-600 dark:text-gray-300 py-2">Billing</Link>
                <button onClick={handleLogout} className="block text-gray-600 dark:text-gray-300 py-2">Sign Out</button>
              </>
            ) : (
              <>
                <Link to="/signin" className="block text-gray-600 dark:text-gray-300 py-2">Sign In</Link>
                <Link to="/signup" className="block text-gray-600 dark:text-gray-300 py-2">Sign Up</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
