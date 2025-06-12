import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import LanguageSelector from './LanguageSelector';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const isLandingPage = location.pathname === '/';

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`sticky top-0 z-50 backdrop-blur-xl border-b border-white/10 ${
        isLandingPage 
          ? 'bg-white/5' 
          : 'bg-white/90'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Modern Logo Integration */}
          <Link to="/" className="flex items-center space-x-4 group">
            <motion.div
              whileHover={{ scale: 1.05, rotateY: 10 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-pink-500 p-0.5 shadow-2xl group-hover:shadow-cyan-500/25 transition-all duration-300">
                <div className="w-full h-full rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center overflow-hidden">
                  <img
                    src="/ArogyaX.ai Logo.png"
                    alt="ArogyaX.ai"
                    className="w-9 h-9 object-contain filter drop-shadow-lg"
                  />
                </div>
              </div>
              {/* Glow Effect */}
              <div className="absolute inset-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400/30 via-blue-500/30 to-pink-500/30 blur-xl -z-10 group-hover:blur-2xl transition-all duration-300"></div>
            </motion.div>
            <div className="flex flex-col">
              <motion.span 
                className={`text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 bg-clip-text text-transparent ${
                  isLandingPage ? 'drop-shadow-lg' : ''
                }`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                ArogyaX.ai
              </motion.span>
              <span className={`text-xs font-medium -mt-1 ${
                isLandingPage ? 'text-white/80' : 'text-gray-600'
              }`}>
                by Byte Forge Titans
              </span>
            </div>
          </Link>

          {/* Modern Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {[
              { to: '/', label: 'Home' },
              { to: '/health-vitals', label: 'Health Check' },
              { to: '/consultation', label: 'AI Consultation' }
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`relative font-medium transition-all duration-300 group ${
                  isLandingPage 
                    ? 'text-white/90 hover:text-white' 
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                {item.label}
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 group-hover:w-full transition-all duration-300"></div>
              </Link>
            ))}
            <div className="relative">
              <LanguageSelector />
            </div>
          </nav>

          {/* Modern Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-pink-500 p-0.5">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400/20 via-blue-500/20 to-pink-500/20 blur-lg -z-10"></div>
                  </div>
                  <span className={`font-medium ${
                    isLandingPage ? 'text-white' : 'text-gray-900'
                  }`}>
                    {user.name}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className={`font-medium transition-colors duration-200 ${
                    isLandingPage 
                      ? 'text-white/80 hover:text-red-400' 
                      : 'text-gray-600 hover:text-red-600'
                  }`}
                >
                  Logout
                </button>
              </div>
            ) : (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/auth"
                  className="relative bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 text-white px-8 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/25 overflow-hidden group"
                >
                  <span className="relative z-10">Get Started</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              </motion.div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 rounded-xl transition-colors duration-200 ${
              isLandingPage 
                ? 'hover:bg-white/10 text-white' 
                : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Modern Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-6 pb-6 border-t border-white/20"
          >
            <nav className="flex flex-col space-y-4 mt-6">
              {[
                { to: '/', label: 'Home' },
                { to: '/health-vitals', label: 'Health Check' },
                { to: '/consultation', label: 'AI Consultation' }
              ].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`font-medium transition-all duration-200 ${
                    isLandingPage 
                      ? 'text-white/90 hover:text-white' 
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex items-center space-x-2 pt-2">
                <Globe size={16} className={isLandingPage ? 'text-white' : 'text-gray-600'} />
                <LanguageSelector />
              </div>
              {user ? (
                <div className="flex flex-col space-y-3 pt-4 border-t border-white/20">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-pink-500 p-0.5">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    <span className={`font-medium ${
                      isLandingPage ? 'text-white' : 'text-gray-900'
                    }`}>
                      {user.name}
                    </span>
                  </div>
                  <button
                    onClick={logout}
                    className="text-left text-red-500 hover:text-red-600 transition-colors duration-200 font-medium"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/auth"
                  className="bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 text-white px-8 py-3 rounded-2xl font-semibold text-center shadow-xl"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Started
                </Link>
              )}
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;