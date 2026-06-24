import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaFolderOpen,
  FaGlobe,
  FaLaptopCode,
  FaTools,
  FaBriefcase,
  FaMobileAlt,
  FaUserEdit,
  FaEye,
  FaShareAlt,
  FaCheckCircle,
  FaArrowRight,
} from 'react-icons/fa';
import FeatureCard from '../components/FeatureCard';
import StepCard from '../components/StepCard';

const Home = () => {
  // Features Data
  const features = [
    {
      icon: FaFolderOpen,
      title: 'Portfolio Generator',
      description: 'Fill in your professional details once, and watch a gorgeous developer resume transform into a portfolio website instantly.',
    },
    {
      icon: FaGlobe,
      title: 'Public Shareable URL',
      description: 'Get your own unique custom URL (e.g., devport.gen/yourname) that is ready to be shared with recruiters and on social platforms.',
    },
    {
      icon: FaLaptopCode,
      title: 'Dynamic Project Showcase',
      description: 'Display your coding projects with full descriptions, tagged tech-stacks, source code links, and live demonstration buttons.',
    },
    {
      icon: FaTools,
      title: 'Skills Management',
      description: 'Curate your stack. Categorize your capabilities by frontend, backend, tools, and databases to present a structured overview.',
    },
    {
      icon: FaBriefcase,
      title: 'Experience Timeline',
      description: 'Highlight your job positions, internships, and educational timeline through a clear, interactive chronological layout.',
    },
    {
      icon: FaMobileAlt,
      title: 'Mobile Responsive Design',
      description: 'Every generated portfolio is automatically optimized for mobile screens, tablet viewports, and high-DPI desktop displays.',
    },
  ];

  // Steps Data
  const steps = [
    {
      number: 1,
      icon: FaUserEdit,
      title: 'Fill Your Information',
      description: 'Create an account and fill out simple forms covering your bio, contact information, skills list, projects, and career experiences.',
    },
    {
      number: 2,
      icon: FaEye,
      title: 'Preview Your Portfolio',
      description: 'Check out how your live portfolio looks in real-time. Make quick adjustments and customize styles to perfectly fit your aesthetic.',
    },
    {
      number: 3,
      icon: FaShareAlt,
      title: 'Publish & Share',
      description: 'Publish your website with a single click. Copy your unique link and start sharing it with recruiters and prospective clients.',
    },
  ];

  // Benefits List Data
  const benefits = [
    'No HTML, CSS, or hosting configurations needed',
    'Pre-designed layouts optimized for software engineers',
    'Boost recruiter response rates with structured portfolios',
    'Completely free to build, customize, and host forever',
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50">
      
      {/* 1. HERO SECTION */}
      <header className="relative bg-white overflow-hidden border-b border-gray-100 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Side: Headline and CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-600">
                🚀 Build Your Brand Online
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
                Build a Professional <br />
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Developer Portfolio
                </span>{' '}
                in Minutes
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Showcase your skills, projects, experience, and achievements with a beautiful portfolio website generated automatically. Stop writing boilerplate HTML and focus on your projects.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  to="/register"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 border border-transparent text-base font-semibold rounded-lg shadow-md text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200"
                >
                  Create Portfolio <FaArrowRight className="ml-2 text-sm" />
                </Link>
                <a
                  href="#how-it-works"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 border border-gray-200 text-base font-semibold rounded-lg text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
                >
                  View Demo
                </a>
              </div>
            </div>

            {/* Right Side: Interactive Mockup Component */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transform hover:scale-[1.03] transition-transform duration-300">
                
                {/* Mock Browser Title Bar */}
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-100 flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <div className="bg-white text-[10px] text-gray-400 px-3 py-1 rounded border border-gray-100 w-full max-w-xs text-center truncate mx-auto select-none font-mono">
                    devportgen.com/johndoe
                  </div>
                </div>

                {/* Mock Portfolio Content */}
                <div className="p-6 space-y-6 text-left">
                  
                  {/* Mock profile */}
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xl font-bold">
                      JD
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-gray-900">John Doe</h4>
                      <p className="text-xs text-blue-600 font-semibold">Full Stack Developer</p>
                    </div>
                  </div>

                  {/* Mock Bio */}
                  <p className="text-gray-600 text-xs leading-relaxed">
                    Building responsive MERN applications. Passionate about automated testing and system scalability.
                  </p>

                  {/* Mock Skills */}
                  <div>
                    <h5 className="text-[10px] font-bold text-gray-900 uppercase tracking-wider mb-2">My Stack</h5>
                    <div className="flex flex-wrap gap-1">
                      {['React', 'Node.js', 'Tailwind', 'MongoDB', 'Git'].map((skill) => (
                        <span key={skill} className="bg-blue-50 text-blue-600 text-[9px] font-semibold px-2 py-0.5 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Mock Projects */}
                  <div>
                    <h5 className="text-[10px] font-bold text-gray-900 uppercase tracking-wider mb-2">Featured Project</h5>
                    <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <h6 className="text-xs font-bold text-gray-900">E-Commerce Engine</h6>
                        <span className="text-[8px] bg-green-100 text-green-700 font-semibold px-1.5 py-0.2 rounded-full">Active</span>
                      </div>
                      <p className="text-[10px] text-gray-500">MERN stack platform with stripe integration and dashboards.</p>
                      <div className="flex space-x-1.5">
                        <span className="text-[8px] bg-gray-200 text-gray-600 px-1 py-0.2 rounded font-mono">React</span>
                        <span className="text-[8px] bg-gray-200 text-gray-600 px-1 py-0.2 rounded font-mono">Stripe</span>
                      </div>
                    </div>
                  </div>

                  {/* Mock Contacts */}
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-[9px] text-gray-500">
                    <span>✉ john.doe@dev.com</span>
                    <span>🔗 github.com/johndoe</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </header>

      {/* 2. FEATURES SECTION */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Why Choose Developer Portfolio Generator?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Everything you need to showcase your coding accomplishments and fast-track your job applications.
            </p>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <FeatureCard
                key={idx}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-20 bg-white border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Create Your Portfolio in 3 Easy Steps
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Create and host a professional development profile with ease.
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, idx) => (
              <StepCard
                key={idx}
                number={step.number}
                icon={step.icon}
                title={step.title}
                description={step.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. BENEFITS SECTION */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Content */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                Designed to Give Developers a Competitive Edge
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Applying to engineering roles shouldn't require custom layouts for your portfolio site. Our platform formats your credentials exactly as recruiters want to see them.
              </p>
              
              <ul className="space-y-4">
                {benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start space-x-3">
                    <FaCheckCircle className="text-green-500 text-xl mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Statistics Cards */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
                <span className="block text-4xl font-extrabold text-blue-600">500+</span>
                <span className="block mt-2 text-sm font-semibold text-gray-600">Portfolios Created</span>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
                <span className="block text-4xl font-extrabold text-blue-600">1000+</span>
                <span className="block mt-2 text-sm font-semibold text-gray-600">Projects Displayed</span>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center sm:col-span-2">
                <span className="block text-4xl font-extrabold text-blue-600">100%</span>
                <span className="block mt-2 text-sm font-semibold text-gray-600">Fully Mobile Responsive</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-12 sm:px-12 sm:py-16 shadow-xl overflow-hidden text-center">
            
            {/* Visual background details */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 rounded-full mix-blend-multiply filter blur-2xl opacity-20 transform translate-x-12 -translate-y-12"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-400 rounded-full mix-blend-multiply filter blur-2xl opacity-20 transform -translate-x-12 translate-y-12"></div>
            
            <div className="relative space-y-6">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Ready to Build Your Developer Portfolio?
              </h2>
              <p className="text-blue-100 max-w-2xl mx-auto leading-relaxed">
                Create a stunning, responsive portfolio today and share your professional software engineering journey with the world.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Link
                  to="/register"
                  className="w-full sm:w-auto px-8 py-3.5 bg-white text-blue-700 hover:bg-blue-50 font-bold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                >
                  Get Started Now
                </Link>
                <a
                  href="#features"
                  className="w-full sm:w-auto px-8 py-3.5 bg-indigo-600 bg-opacity-40 hover:bg-opacity-60 text-white font-bold rounded-lg border border-indigo-300 transition-all duration-200"
                >
                  Learn More
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
