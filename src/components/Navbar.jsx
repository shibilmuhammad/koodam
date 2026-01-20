import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-dark/95 backdrop-blur-md border-b border-brand-light/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-brand-accent/20 group-hover:border-brand-accent/50 transition-colors"
            >
              <img
                src="/logo.png"
                alt="Kyte Travel Partner"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white leading-none">KYTE</span>
              <span className="text-xs text-brand-accent font-medium tracking-wider uppercase">Travel Partner</span>
            </div>
          </Link>

          {/* Menu */}
          <div className="flex items-center gap-6">

            <a
              href="https://wa.me/919074092499" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-brand-accent hover:bg-brand-accent-hover text-white text-sm font-semibold transition-all hover:shadow-[0_0_20px_rgba(20,184,166,0.3)] active:scale-95"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

