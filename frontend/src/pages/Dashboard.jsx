import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  FiExternalLink,
  FiEdit3,
  FiCopy,
  FiTrash2,
  FiLogOut,
  FiCheckCircle,
  FiLoader,
  FiAlertTriangle,
  FiGlobe,
  FiUser,
} from 'react-icons/fi';
import Toast from '../components/Toast';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, token, logout } = useAuth();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [toast, setToast] = useState({ type: '', message: '' });

  const username = user?.username;
  const fullName = user?.name;

  /* ── Fetch portfolio data ── */
  useEffect(() => {
    if (!username) return;

    const fetchPortfolio = async () => {
      try {
        const res = await fetch(`/api/portfolio/${username}`);
        const data = await res.json();
        if (res.ok) {
          setPortfolio(data);
        }
      } catch {
        // silently fail — show empty state
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [username]);

  /* ── Toast helpers ── */
  const showToast = (type, message) => setToast({ type, message });
  const clearToast = () => setToast({ type: '', message: '' });

  /* ── Portfolio URL ── */
  const portfolioUrl = `${window.location.origin}/portfolio/${username}`;

  /* ── Copy to clipboard ── */
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(portfolioUrl);
      showToast('success', '📋 Portfolio link copied to clipboard!');
    } catch {
      showToast('error', 'Failed to copy link.');
    }
  };

  /* ── Delete portfolio ── */
  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/portfolio/${username}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Delete failed');
      }

      showToast('success', '🗑️ Portfolio deleted successfully.');
      logout();

      setTimeout(() => navigate('/', { replace: true }), 1500);
    } catch (err) {
      showToast('error', err.message || 'Failed to delete portfolio.');
      setDeleting(false);
      setShowDeleteModal(false);
    }
  };

  /* ── Logout ── */
  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  /* ── Loading state ── */
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-500 font-medium">Loading dashboard…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">

        {/* ── Welcome Header ── */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-200">
              <FiUser className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
                Welcome back, {fullName || username}!
              </h1>
              <p className="text-gray-500 text-sm">Manage your developer portfolio</p>
            </div>
          </div>
        </div>

        {/* ── Portfolio Status Card ── */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden mb-6">
          {/* Status header */}
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-4 flex items-center gap-3">
            <FiCheckCircle className="text-white text-xl" />
            <div>
              <h2 className="text-white font-bold text-lg">Portfolio Published</h2>
              <p className="text-emerald-100 text-sm">Your portfolio is live and accessible to everyone</p>
            </div>
          </div>

          {/* Portfolio URL */}
          <div className="p-6">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">
              Portfolio URL
            </label>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-blue-600 font-medium truncate">
                <FiGlobe className="inline mr-2 text-gray-400" />
                {portfolioUrl}
              </div>
              <button
                type="button"
                onClick={handleCopyLink}
                className="flex items-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-xl transition-colors"
              >
                <FiCopy />
                Copy
              </button>
            </div>
          </div>
        </div>

        {/* ── Action Buttons ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {/* View Live Portfolio */}
          <Link
            to={`/portfolio/${username}`}
            target="_blank"
            className="flex items-center gap-3 px-6 py-4 bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-100 group-hover:bg-blue-200 flex items-center justify-center transition-colors">
              <FiExternalLink className="text-blue-600 text-lg" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">View Live Portfolio</p>
              <p className="text-xs text-gray-400">See your published portfolio</p>
            </div>
          </Link>

          {/* Edit Portfolio */}
          <Link
            to={`/edit/${username}`}
            className="flex items-center gap-3 px-6 py-4 bg-white hover:bg-indigo-50 border border-gray-200 hover:border-indigo-300 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 group"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-100 group-hover:bg-indigo-200 flex items-center justify-center transition-colors">
              <FiEdit3 className="text-indigo-600 text-lg" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Edit Portfolio</p>
              <p className="text-xs text-gray-400">Update your information</p>
            </div>
          </Link>

          {/* Copy Link */}
          <button
            type="button"
            onClick={handleCopyLink}
            className="flex items-center gap-3 px-6 py-4 bg-white hover:bg-emerald-50 border border-gray-200 hover:border-emerald-300 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 group text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-100 group-hover:bg-emerald-200 flex items-center justify-center transition-colors">
              <FiCopy className="text-emerald-600 text-lg" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Copy Link</p>
              <p className="text-xs text-gray-400">Share your portfolio URL</p>
            </div>
          </button>

          {/* Delete Portfolio */}
          <button
            type="button"
            onClick={() => setShowDeleteModal(true)}
            className="flex items-center gap-3 px-6 py-4 bg-white hover:bg-red-50 border border-gray-200 hover:border-red-300 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 group text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-red-100 group-hover:bg-red-200 flex items-center justify-center transition-colors">
              <FiTrash2 className="text-red-600 text-lg" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Delete Portfolio</p>
              <p className="text-xs text-gray-400">Permanently remove your portfolio</p>
            </div>
          </button>
        </div>

        {/* ── Logout ── */}
        <div className="text-center">
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-6 py-3 text-gray-500 hover:text-gray-700 hover:bg-gray-100 font-medium rounded-xl transition-all"
          >
            <FiLogOut />
            Logout
          </button>
        </div>
      </div>

      {/* ── Delete Confirmation Modal ── */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-scale-up">
            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <FiAlertTriangle className="text-red-500 text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
              Delete Portfolio?
            </h3>
            <p className="text-gray-500 text-center text-sm mb-8">
              This action cannot be undone. Your portfolio, all uploaded images, and associated data will be permanently removed.
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                disabled={deleting}
                className="flex-1 px-5 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 px-5 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {deleting ? (
                  <>
                    <FiLoader className="animate-spin" />
                    Deleting…
                  </>
                ) : (
                  <>
                    <FiTrash2 />
                    Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <Toast
        type={toast.type}
        message={toast.message}
        onClose={clearToast}
      />
    </div>
  );
};

export default Dashboard;
