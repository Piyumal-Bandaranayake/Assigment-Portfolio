import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiAlertCircle, FiArrowLeft } from 'react-icons/fi';
import PortfolioLayout from '../components/portfolio/PortfolioLayout';

const PublicPortfolio = () => {
  const { username } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await fetch(`/api/portfolio/${username}`);
        const result = await res.json();

        if (!res.ok) {
          throw new Error(result.message || 'Portfolio not found');
        }

        setData(result);
      } catch (err) {
        setError(err.message || 'Failed to load portfolio');
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [username]);

  /* ── Loading state ── */
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-500 font-medium">Loading portfolio…</p>
        </div>
      </div>
    );
  }

  /* ── Error / 404 state ── */
  if (error || !data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <FiAlertCircle className="text-red-500 text-2xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Portfolio Not Found</h2>
          <p className="text-gray-500 mb-8">
            {error || 'The portfolio you are looking for does not exist or has been removed.'}
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
          >
            <FiArrowLeft />
            Back to Homepage
          </Link>
        </div>
      </div>
    );
  }

  /* ── Render portfolio ── */
  return <PortfolioLayout data={data} />;
};

export default PublicPortfolio;
