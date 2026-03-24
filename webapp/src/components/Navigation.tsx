import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faTimes,
  faMoon,
  faSun,
  faUser,
  faSignOut,
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';

const Navigation: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { theme, setTheme, isDark } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setTheme(newTheme);
  };

  const navLinks = [
    { label: 'Features', href: '/#features' },
    { label: 'Pricing', href: '/pricing' },
  ];

  const handleLogout = async () => {
    await logout();
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-transparent bg-clip-text bg-gradient-br">
            <div className="w-8 h-8 rounded-lg bg-gradient-br flex items-center justify-center text-white font-bold">
              TP
            </div>
            TrustProof
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 font-medium text-sm"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              aria-label="Toggle theme"
            >
              <FontAwesomeIcon icon={isDark ? faSun : faMoon} />
            </button>

            {/* Auth Buttons/Profile */}
            {isAuthenticated ? (
              <div className="hidden md:flex items-center gap-3">
                <Link
                  to="/dashboard"
                  className="px-4 py-2 rounded-lg text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 font-medium text-sm"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg bg-gradient-br text-white hover:opacity-90 font-medium text-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <Link
                  to="/signin"
                  className="px-4 py-2 rounded-lg text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 font-medium text-sm"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-lg bg-gradient-br text-white hover:opacity-90 font-medium text-sm"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300"
            >
              <FontAwesomeIcon icon={mobileMenuOpen ? faTimes : faBars} size="lg" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-3 border-t border-gray-200 dark:border-gray-800 pt-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block px-4 py-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-gray-200 dark:border-gray-800 space-y-2">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 rounded-lg text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FontAwesomeIcon icon={faUser} className="mr-2" />
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 rounded-lg bg-gradient-br text-white hover:opacity-90"
                  >
                    <FontAwesomeIcon icon={faSignOut} className="mr-2" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/signin"
                    className="block px-4 py-2 rounded-lg text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-4 py-2 rounded-lg bg-gradient-br text-white hover:opacity-90"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
