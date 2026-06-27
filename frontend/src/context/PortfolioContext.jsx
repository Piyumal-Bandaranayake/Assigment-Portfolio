import React, { createContext, useContext, useState, useCallback } from 'react';

const PortfolioContext = createContext(null);

/**
 * PortfolioProvider
 * Holds form data so it can travel from Create → Preview → Publish
 * without writing anything to the database.
 */
export const PortfolioProvider = ({ children }) => {
  const [portfolioData, setPortfolioDataState] = useState(null);

  const setPortfolioData = useCallback((data) => {
    setPortfolioDataState(data);
  }, []);

  const clearPortfolioData = useCallback(() => {
    setPortfolioDataState(null);
  }, []);

  return (
    <PortfolioContext.Provider
      value={{ portfolioData, setPortfolioData, clearPortfolioData }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

/**
 * Hook to consume the portfolio context.
 * Throws if used outside the provider.
 */
export const usePortfolio = () => {
  const ctx = useContext(PortfolioContext);
  if (!ctx) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return ctx;
};
