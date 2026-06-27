import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSend, FiArrowLeft, FiLoader } from 'react-icons/fi';
import { usePortfolio } from '../context/PortfolioContext';
import PortfolioLayout from '../components/portfolio/PortfolioLayout';
import Toast from '../components/Toast';

const PreviewPortfolio = () => {
  const navigate = useNavigate();
  const { portfolioData, clearPortfolioData } = usePortfolio();
  const [isPublishing, setIsPublishing] = useState(false);
  const [toast, setToast] = useState({ type: '', message: '' });

  /* ── Redirect to /create if no data in context ── */
  useEffect(() => {
    if (!portfolioData) {
      navigate('/create', { replace: true });
    }
  }, [portfolioData, navigate]);

  if (!portfolioData) return null;

  /* ── Toast helper ── */
  const showToast = (type, message) => setToast({ type, message });
  const clearToast = () => setToast({ type: '', message: '' });

  /* ── Back to Edit — preserves context data ── */
  const handleBackToEdit = () => {
    navigate('/create');
  };

  /* ── Publish Workflow ── */
  const handlePublish = async () => {
    setIsPublishing(true);

    try {
      /* Step 1: Register the user account */
      const registerRes = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: portfolioData.username,
          name: portfolioData.fullName,
          email: portfolioData.contact.email,
          password: portfolioData.password,
        }),
      });

      const registerData = await registerRes.json();
      if (!registerRes.ok) {
        throw new Error(registerData.message || 'Registration failed');
      }

      const token = registerData.token;

      /* Step 2: Create the portfolio with the JWT token */
      const {
        password: _pw,
        confirmPassword: _cpw,
        ...formFields
      } = portfolioData;

      const portfolioPayload = { ...formFields };

      const portfolioRes = await fetch('/api/portfolio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(portfolioPayload),
      });

      const portfolioResult = await portfolioRes.json();
      if (!portfolioRes.ok) {
        throw new Error(portfolioResult.message || 'Portfolio creation failed');
      }

      /* Step 3: Store auth data in localStorage */
      localStorage.setItem('portfolio_token', token);
      localStorage.setItem('portfolio_username', portfolioData.username);
      localStorage.setItem('portfolio_fullName', portfolioData.fullName);

      /* Step 4: Show success toast */
      showToast('success', '🎉 Your portfolio has been published successfully!');

      /* Step 5: Clear context and redirect after a brief delay */
      setTimeout(() => {
        clearPortfolioData();
        navigate('/dashboard', { replace: true });
      }, 1500);
    } catch (err) {
      showToast('error', err.message || 'Something went wrong. Please try again.');
      setIsPublishing(false);
    }
  };

  return (
    <div className="relative">
      {/* Preview banner */}
      <div className="bg-amber-50 border-b border-amber-200 text-amber-800 text-center py-3 px-4 text-sm font-medium">
        <span className="inline-flex items-center gap-2">
          👁️ Preview Mode — This is how your portfolio will look after publishing.
        </span>
      </div>

      {/* Portfolio content */}
      <PortfolioLayout data={portfolioData} />

      {/* ── Floating Action Buttons ── */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-3 z-50">
        {/* Back to Edit */}
        <button
          type="button"
          onClick={handleBackToEdit}
          className="flex items-center gap-2 px-5 py-3 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-200 active:scale-95"
        >
          <FiArrowLeft />
          Back to Edit
        </button>

        {/* Publish Portfolio */}
        <button
          type="button"
          onClick={handlePublish}
          disabled={isPublishing}
          className="flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 transition-all duration-200 active:scale-95"
        >
          {isPublishing ? (
            <>
              <FiLoader className="animate-spin" />
              Publishing…
            </>
          ) : (
            <>
              <FiSend />
              Publish Portfolio
            </>
          )}
        </button>
      </div>

      <Toast
        type={toast.type}
        message={toast.message}
        onClose={clearToast}
      />
    </div>
  );
};

export default PreviewPortfolio;
