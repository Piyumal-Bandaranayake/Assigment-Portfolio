import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { PortfolioProvider } from './context/PortfolioContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import CreatePortfolio from './pages/CreatePortfolio';
import PreviewPortfolio from './pages/PreviewPortfolio';
import PublicPortfolio from './pages/PublicPortfolio';
import Dashboard from './pages/Dashboard';

/* ─────────────────────────────────────────
   Layout wrapper — hides Navbar/Footer on
   standalone pages (preview, public portfolio).
───────────────────────────────────────── */
const AppLayout = () => {
  const location = useLocation();

  // Routes that should render without the global Navbar/Footer
  const isStandalone =
    location.pathname.startsWith('/portfolio/') ||
    location.pathname === '/preview';

  return (
    <div className={isStandalone ? '' : 'flex flex-col min-h-screen bg-gray-50'}>

      {/* Sticky Global Navigation (hidden on standalone pages) */}
      {!isStandalone && <Navbar />}

      {/* Dynamic Route Pages */}
      <main className={isStandalone ? '' : 'flex-grow'}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreatePortfolio />} />
          <Route path="/preview" element={<PreviewPortfolio />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/portfolio/:username" element={<PublicPortfolio />} />

          {/* Fallback 404 Route */}
          <Route
            path="*"
            element={
              <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
                  404 - Page Not Found
                </h2>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>
                <a
                  href="/"
                  className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-colors"
                >
                  Return to Homepage
                </a>
              </div>
            }
          />
        </Routes>
      </main>

      {/* Global Footer (hidden on standalone pages) */}
      {!isStandalone && <Footer />}

    </div>
  );
};

function App() {
  return (
    <Router>
      <PortfolioProvider>
        <AppLayout />
      </PortfolioProvider>
    </Router>
  );
}

export default App;
