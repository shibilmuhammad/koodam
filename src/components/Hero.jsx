import { motion } from 'framer-motion';

const Hero = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 min-h-[60vh] flex flex-col items-center justify-center text-center overflow-hidden">
      {/* Background Gradient Blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-accent/5 rounded-full blur-3xl -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <span className="inline-block py-1 px-3 rounded-full bg-brand-accent/10 text-brand-accent text-sm font-medium mb-6 border border-brand-accent/20">
          Discover Premium Stays
        </span>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-6">
          Find the Perfect Stay, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-teal-200">
            Your Way
          </span>
        </h1>
        <p className="text-lg md:text-xl text-white/60 mb-10 max-w-2xl mx-auto">
          From budget-friendly homestays to luxury resorts, discover the best properties across Munnar, Wayanad, and beyond.
        </p>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto w-full group">
          <div className="absolute -inset-1 bg-gradient-to-r from-brand-accent to-teal-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative bg-brand-gray/80 backdrop-blur-xl border border-white/10 rounded-2xl p-2 flex items-center">
            <div className="pl-4 text-brand-accent">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by location (e.g. Munnar, Wayanad)"
              className="w-full bg-transparent border-none text-white placeholder-white/40 focus:ring-0 text-lg py-3 px-4"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
