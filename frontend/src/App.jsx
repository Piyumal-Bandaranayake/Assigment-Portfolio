import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { PortfolioProvider } from './context/PortfolioContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
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

  // Login page uses its own full-screen layout — hide Navbar/Footer
  const isLoginPage = location.pathname === '/login';

  return (
    <div className={isStandalone || isLoginPage ? '' : 'flex flex-col min-h-screen bg-gray-50'}>

      {/* Sticky Global Navigation (hidden on standalone & login pages) */}
      {!isStandalone && !isLoginPage && <Navbar />}

      {/* Dynamic Route Pages */}
      <main className={isStandalone || isLoginPage ? '' : 'flex-grow'}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/preview" element={<PreviewPortfolio />} />
          <Route path="/portfolio/:username" element={<PublicPortfolio />} />

          <Route path="/create" element={<CreatePortfolio />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/edit/:username" element={<CreatePortfolio />} />
          </Route>

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

      {/* Global Footer (hidden on standalone & login pages) */}
      {!isStandalone && !isLoginPage && <Footer />}

    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <PortfolioProvider>
          <AppLayout />
        </PortfolioProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
