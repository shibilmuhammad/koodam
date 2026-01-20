import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from '../components/Hero';
import FilterBar from '../components/FilterBar';
import PropertyCard from '../components/PropertyCard';
import { properties as initialProperties } from '../data/properties';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('price-low');
  
  // Use properties from localStorage if available, else initial data
  // Sync with data.js storage key
  const STORAGE_KEY = 'kyte_properties_v2';

  const [properties, setProperties] = useState(() => {
     const stored = localStorage.getItem(STORAGE_KEY);
     return stored ? JSON.parse(stored) : initialProperties;
  });

  // Listen for updates from Admin panel
  useEffect(() => {
    const handleStorageUpdate = () => {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setProperties(JSON.parse(stored));
      }
    };

    window.addEventListener('storage-update', handleStorageUpdate);
    return () => window.removeEventListener('storage-update', handleStorageUpdate);
  }, []);

  const filteredProperties = useMemo(() => {
    return properties
      .filter(property => {
        // Search Filter (Location)
        if (searchTerm && !property.location.toLowerCase().includes(searchTerm.toLowerCase())) {
           return false;
        }

        // Category Filter
        if (activeCategory !== 'all' && property.category !== activeCategory) {
          return false;
        }

        // Price Filter
        if (priceFilter !== 'all') {
          if (priceFilter === 'under-2000' && property.price >= 2000) return false;
          if (priceFilter === '2000-5000' && (property.price < 2000 || property.price > 5000)) return false;
          if (priceFilter === 'above-5000' && property.price <= 5000) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortOrder === 'price-low') return a.price - b.price;
        if (sortOrder === 'price-high') return b.price - a.price;
        return 0;
      });
  }, [properties, searchTerm, activeCategory, priceFilter, sortOrder]);

  return (
    <div className="min-h-screen bg-brand-dark flex flex-col">
      <Hero searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      
      <div className="flex-1 bg-brand-dark relative z-10 pb-20">
        <FilterBar 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory}
          priceFilter={priceFilter}
          setPriceFilter={setPriceFilter}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="popLayout">
            {filteredProperties.length > 0 ? (
              <motion.div 
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredProperties.map((property, index) => (
                  <PropertyCard key={property.id} property={property} index={index} />
                ))}
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="inline-block p-4 rounded-full bg-white/5 mb-4">
                  <svg className="w-8 h-8 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-white mb-2">No properties found</h3>
                <p className="text-white/60">Try adjusting your search or filters</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Home;

