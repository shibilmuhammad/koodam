import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ResortCard from '../components/ResortCard';
import { getResorts } from '../lib/data';

const Resorts = () => {
  const [resorts, setResorts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResorts = async () => {
      try {
        const data = await getResorts();
        setResorts(data);
      } catch (error) {
        console.error('Error fetching resorts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResorts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-teal-400 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
            Our Resorts
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Explore our curated collection of unique resorts, each offering a distinct experience
          </p>
          
          {/* Decorative wavy line */}
          <div className="mt-6 flex justify-center">
            <svg
              className="w-48 h-1 text-white/30"
              viewBox="0 0 200 4"
              preserveAspectRatio="none"
            >
              <path
                d="M0,2 Q50,0 100,2 T200,2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </div>
        </motion.div>

        {/* Resorts Grid */}
        {resorts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-white/60 text-lg">No resorts available at the moment.</p>
            <p className="text-white/40 text-sm mt-2">Check back soon for new additions!</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resorts.map((resort, index) => (
              <ResortCard key={resort.id} resort={resort} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Resorts;

