import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.img
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              src="/logo.png"
              alt="KOODAM Logo"
              className="h-10 w-10 object-contain"
              onError={(e) => {
                // Fallback to text if image not found
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <div className="text-2xl font-bold text-white" style={{ display: 'none' }}>
              KOODAM
            </div>
          </Link>

          {/* Menu */}
          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/'
                  ? 'text-teal-400'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Home
            </Link>
            <Link
              to="/resorts"
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/resorts'
                  ? 'text-teal-400'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Resorts
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

