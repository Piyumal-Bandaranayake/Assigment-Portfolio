import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import CreatePortfolio from './pages/CreatePortfolio';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        
        {/* Sticky Global Navigation */}
        <Navbar />

        {/* Dynamic Route Pages */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreatePortfolio />} />
            
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

        {/* Global Footer */}
        <Footer />

      </div>
    </Router>
  );
}

export default App;
