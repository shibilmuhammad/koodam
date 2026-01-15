import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  // Animated birds component
  const Bird = ({ delay, x, y }) => (
    <motion.svg
      initial={{ opacity: 0, x: x - 20, y: y }}
      animate={{
        opacity: [0, 1, 1, 0],
        x: [x - 20, x, x + 20, x + 40],
        y: [y, y - 10, y, y + 5],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        repeatDelay: 2,
      }}
      className="absolute w-6 h-6 text-white/60"
      style={{ left: `${x}%`, top: `${y}%` }}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M2 12s4-4 10-4 10 4 10 4M2 12s4 4 10 4 10-4 10-4" />
    </motion.svg>
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center relative overflow-hidden pt-16">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#000] to-[#0A0A0A]"></div>
        
        {/* Animated Birds */}
        <Bird delay={0} x={15} y={20} />
        <Bird delay={1} x={45} y={15} />
        <Bird delay={2} x={75} y={25} />

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          {/* Logo/Title */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <motion.img
              src="/logo.png"
              alt="KOODAM Logo"
              className="h-32 sm:h-40 md:h-48 w-auto mx-auto mb-6 object-contain"
              onError={(e) => {
                // Fallback to text if image not found
                e.target.style.display = 'none';
                const fallback = document.createElement('h1');
                fallback.className = 'text-6xl sm:text-7xl md:text-8xl font-bold text-white mb-4 tracking-tight';
                fallback.textContent = 'KOODAM';
                e.target.parentNode.insertBefore(fallback, e.target.nextSibling);
              }}
            />
            
            {/* Wavy underline decoration */}
            <div className="relative inline-block">
              <svg
                className="w-64 sm:w-80 md:w-96 h-2 text-white/30"
                viewBox="0 0 400 10"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,5 Q100,0 200,5 T400,5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl sm:text-2xl md:text-3xl text-white/80 mb-12 font-light"
          >
            Discover Unique Resorts with KOODAM
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Link to="/resorts">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(20, 184, 166, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-teal-500/50"
              >
                View Resorts
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Decorative curved elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden">
          <svg
            className="absolute bottom-0 w-full h-full"
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,120 Q360,60 720,80 T1440,100 L1440,120 L0,120 Z"
              fill="#0A0A0A"
              opacity="0.5"
            />
          </svg>
        </div>
      </section>
    </div>
  );
};

export default Home;

