import { motion } from 'framer-motion';
import ImageCarousel from './ImageCarousel';
import WhatsAppButton from './WhatsAppButton';

const PropertyCard = ({ property, index }) => {
  const getCategoryColor = (cat) => {
    switch (cat) {
      case 'luxury': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'mid': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      default: return 'bg-brand-accent/20 text-brand-accent border-brand-accent/30';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-brand-gray rounded-2xl overflow-hidden border border-white/5 hover:border-brand-accent/30 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
    >
      {/* Image Carousel */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <ImageCarousel images={property.images || []} />
        
        {/* Category Badge */}
        <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border backdrop-blur-md ${getCategoryColor(property.category)}`}>
          {property.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-bold text-white mb-1 group-hover:text-brand-accent transition-colors">
              {property.name}
            </h3>
            <div className="flex items-center text-white/50 text-sm">
              <svg className="w-4 h-4 mr-1 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {property.location}
            </div>
          </div>
        </div>

        <div className="my-4 h-px bg-white/5" />

        <div className="flex items-center justify-between">
          <div>
            <span className="text-white/40 text-xs uppercase tracking-wider block mb-0.5">Price / Night</span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-white">₹{property.price.toLocaleString('en-IN')}</span>
            </div>
          </div>
          
          <WhatsAppButton 
            phone={property.whatsapp} 
            resortName={property.name} 
            className="!w-auto !px-4 !py-2 !text-xs" 
          />
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;
