import { motion } from 'framer-motion';
import ImageCarousel from './ImageCarousel';
import WhatsAppButton from './WhatsAppButton';

const ResortCard = ({ resort, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-teal-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-teal-400/20"
    >
      {/* Image Carousel */}
      <div className="relative">
        <ImageCarousel images={resort.images || []} />
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-3">
          <h3 className="text-xl font-bold text-white mb-1">{resort.name}</h3>
          <div className="flex items-center text-white/60 text-sm">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {resort.location}
          </div>
        </div>

        <p className="text-white/70 text-sm mb-4 line-clamp-2">
          {resort.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-white/40 text-xs">Starting from</span>
            <p className="text-2xl font-bold text-teal-400">{resort.price}</p>
            <span className="text-white/40 text-xs">per night</span>
          </div>
        </div>

        <WhatsAppButton phone={resort.whatsapp} resortName={resort.name} />
      </div>
    </motion.div>
  );
};

export default ResortCard;

