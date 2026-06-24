import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCode, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm backdrop-blur-md bg-opacity-90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and App Name */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
              <FaCode className="text-2xl" />
              <span className="text-xl font-bold tracking-tight text-gray-900">
                DevPort<span className="text-blue-600 font-normal">Gen</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
            <Link
              to="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
            >
              Create Portfolio
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              type="button"
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-4 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block text-gray-600 hover:text-blue-600 font-medium py-2 transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
          <Link
            to="/register"
            onClick={() => setIsOpen(false)}
            className="block text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition-all duration-200"
          >
            Create Portfolio
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
