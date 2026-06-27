import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  FaCode,
  FaBars,
  FaTimes,
} from 'react-icons/fa';
import {
  FiLogOut,
  FiUser,
  FiGrid,
  FiEdit3,
  FiExternalLink,
  FiChevronDown,
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import Toast from './Toast';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [toast, setToast] = useState({ type: '', message: '' });

  const dropdownRef = useRef(null);

  /* ── Close dropdown on outside click ── */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /* ── Close mobile menu on route change ── */
  const closeMobile = () => setMobileOpen(false);

  /* ── Logout handler ── */
  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    setMobileOpen(false);
    setToast({ type: 'success', message: '👋 Logged out successfully!' });
    setTimeout(() => navigate('/', { replace: true }), 600);
  };

  /* ── User initials for avatar ── */
  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  /* ── Active link styles ── */
  const linkBase =
    'relative text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200 py-1';
  const linkActive =
    'relative text-blue-600 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600 after:rounded-full';

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* ── Logo ── */}
            <Link to="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
              <FaCode className="text-2xl" />
              <span className="text-xl font-bold tracking-tight text-gray-900">
                DevPort<span className="text-blue-600 font-normal">Gen</span>
              </span>
            </Link>

            {/* ── Desktop Nav ── */}
            <div className="hidden md:flex items-center space-x-6">
              {!isAuthenticated ? (
                /* ── Guest Links ── */
                <>
                  <NavLink
                    to="/"
                    end
                    className={({ isActive }) => (isActive ? linkActive : linkBase)}
                  >
                    Home
                  </NavLink>
                  <a href="/#features" className={linkBase}>
                    Features
                  </a>
                  <NavLink
                    to="/create"
                    className={({ isActive }) => (isActive ? linkActive : linkBase)}
                  >
                    Create Portfolio
                  </NavLink>
                  <NavLink
                    to="/login"
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-5 py-2 rounded-lg shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200"
                  >
                    Login
                  </NavLink>
                </>
              ) : (
                /* ── Authenticated Links ── */
                <>
                  <NavLink
                    to="/"
                    end
                    className={({ isActive }) => (isActive ? linkActive : linkBase)}
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) => (isActive ? linkActive : linkBase)}
                  >
                    Dashboard
                  </NavLink>
                  <NavLink
                    to="/create"
                    className={({ isActive }) => (isActive ? linkActive : linkBase)}
                  >
                    Create Portfolio
                  </NavLink>

                  {/* ── User Dropdown ── */}
                  <div className="relative" ref={dropdownRef}>
                    <button
                      type="button"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="flex items-center gap-2.5 pl-1 pr-2 py-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                        {getInitials(user?.name)}
                      </div>
                      <span className="text-sm font-medium text-gray-700 max-w-[120px] truncate">
                        {user?.username || user?.name}
                      </span>
                      <FiChevronDown
                        className={`text-gray-400 text-sm transition-transform duration-200 ${
                          dropdownOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {/* Dropdown */}
                    {dropdownOpen && (
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl shadow-gray-200/60 border border-gray-100 py-2 animate-dropdown z-50">
                        {/* User info header */}
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-sm font-semibold text-gray-900 truncate">{user?.name}</p>
                          <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                        </div>

                        <div className="py-1">
                          <Link
                            to="/dashboard"
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                          >
                            <FiGrid className="text-base" />
                            Dashboard
                          </Link>
                          <Link
                            to={`/portfolio/${user?.username}`}
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                          >
                            <FiExternalLink className="text-base" />
                            My Portfolio
                          </Link>
                          <Link
                            to={`/edit/${user?.username}`}
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                          >
                            <FiEdit3 className="text-base" />
                            Edit Portfolio
                          </Link>
                        </div>

                        <div className="border-t border-gray-100 pt-1">
                          <button
                            type="button"
                            onClick={handleLogout}
                            className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <FiLogOut className="text-base" />
                            Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* ── Mobile Menu Button ── */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-gray-600 hover:text-gray-900 focus:outline-none p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
            </button>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-b border-gray-200 animate-slide-up">
            <div className="px-4 pt-2 pb-4 space-y-1">
              {!isAuthenticated ? (
                /* ── Guest Mobile Links ── */
                <>
                  <NavLink
                    to="/"
                    end
                    onClick={closeMobile}
                    className={({ isActive }) =>
                      `block py-2.5 px-3 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                      }`
                    }
                  >
                    Home
                  </NavLink>
                  <a
                    href="/#features"
                    onClick={closeMobile}
                    className="block py-2.5 px-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                  >
                    Features
                  </a>
                  <NavLink
                    to="/create"
                    onClick={closeMobile}
                    className={({ isActive }) =>
                      `block py-2.5 px-3 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                      }`
                    }
                  >
                    Create Portfolio
                  </NavLink>
                  <NavLink
                    to="/login"
                    onClick={closeMobile}
                    className="block text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold px-4 py-2.5 rounded-lg shadow-md mt-2 transition-all"
                  >
                    Login
                  </NavLink>
                </>
              ) : (
                /* ── Auth Mobile Links ── */
                <>
                  {/* User info */}
                  <div className="flex items-center gap-3 px-3 py-3 mb-2 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-sm font-bold shadow-sm">
                      {getInitials(user?.name)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">{user?.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                    </div>
                  </div>

                  <NavLink
                    to="/"
                    end
                    onClick={closeMobile}
                    className={({ isActive }) =>
                      `flex items-center gap-3 py-2.5 px-3 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                      }`
                    }
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to="/dashboard"
                    onClick={closeMobile}
                    className={({ isActive }) =>
                      `flex items-center gap-3 py-2.5 px-3 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                      }`
                    }
                  >
                    <FiGrid className="text-base" />
                    Dashboard
                  </NavLink>
                  <NavLink
                    to="/create"
                    onClick={closeMobile}
                    className={({ isActive }) =>
                      `flex items-center gap-3 py-2.5 px-3 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                      }`
                    }
                  >
                    <FiEdit3 className="text-base" />
                    Create Portfolio
                  </NavLink>
                  <Link
                    to={`/portfolio/${user?.username}`}
                    onClick={closeMobile}
                    className="flex items-center gap-3 py-2.5 px-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                  >
                    <FiExternalLink className="text-base" />
                    My Portfolio
                  </Link>
                  <Link
                    to={`/edit/${user?.username}`}
                    onClick={closeMobile}
                    className="flex items-center gap-3 py-2.5 px-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                  >
                    <FiUser className="text-base" />
                    Edit Portfolio
                  </Link>

                  <div className="border-t border-gray-100 mt-2 pt-2">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full py-2.5 px-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <FiLogOut className="text-base" />
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      <Toast type={toast.type} message={toast.message} onClose={() => setToast({ type: '', message: '' })} />
    </>
  );
};

export default Navbar;
