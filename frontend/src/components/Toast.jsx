import React, { useEffect } from 'react';
import { FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

/**
 * Reusable toast notification.
 * Props:
 *   type     — 'success' | 'error'
 *   message  — string (empty = hidden)
 *   onClose  — callback to dismiss
 *   duration — auto-dismiss ms (default 4000, 0 = manual only)
 */
const Toast = ({ type, message, onClose, duration = 4000 }) => {
  useEffect(() => {
    if (!message || duration === 0) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <div
      className={`fixed bottom-6 right-6 z-[100] flex items-center gap-3 px-5 py-4 rounded-xl shadow-xl text-sm font-medium transition-all duration-300 animate-slide-up ${
        type === 'success'
          ? 'bg-green-50 border border-green-200 text-green-800'
          : 'bg-red-50 border border-red-200 text-red-800'
      }`}
    >
      {type === 'success' ? (
        <FiCheckCircle className="text-green-500 text-lg shrink-0" />
      ) : (
        <FiAlertCircle className="text-red-500 text-lg shrink-0" />
      )}
      <span className="max-w-xs">{message}</span>
      <button
        onClick={onClose}
        className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
      >
        ✕
      </button>
    </div>
  );
};

export default Toast;
