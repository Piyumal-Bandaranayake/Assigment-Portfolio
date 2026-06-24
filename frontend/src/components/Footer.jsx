import React from 'react';
import { Link } from 'react-router-dom';
import { FaCode, FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
              <FaCode className="text-2xl" />
              <span className="text-xl font-bold tracking-tight text-gray-900">
                DevPort<span className="text-blue-600 font-normal">Gen</span>
              </span>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed max-w-sm">
              Create, customize, and instantly publish a professional developer portfolio website. Showcase your work and tell your coding story without writing any boilerplate code.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <Link to="/register" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  Get Started
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="col-span-1">
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
              Connect
            </h4>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-600 text-xl transition-colors"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-600 text-xl transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-600 text-xl transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a
                href="mailto:support@devportgen.com"
                className="text-gray-500 hover:text-blue-600 text-xl transition-colors"
                aria-label="Email support"
              >
                <FaEnvelope />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright and Legal Links */}
        <div className="mt-8 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} DevPortGen. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
