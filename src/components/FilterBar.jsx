import { motion } from 'framer-motion';

const FilterBar = ({ activeCategory, setActiveCategory, priceFilter, setPriceFilter, sortOrder, setSortOrder }) => {
  const categories = [
    { id: 'all', label: 'All Stays' },
    { id: 'budget', label: 'Budget Friendly' },
    { id: 'mid', label: 'Mid-Range' },
    { id: 'luxury', label: 'Luxury' },
  ];

  return (
    <div className="sticky top-20 z-40 bg-brand-dark/80 backdrop-blur-md border-y border-white/5 py-4 mb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat.id
                    ? 'bg-white text-brand-dark shadow-lg shadow-white/10'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {/* Price Filter */}
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-brand-accent cursor-pointer hover:bg-white/10"
            >
              <option value="all">Any Price</option>
              <option value="under-2000">Under ₹2000</option>
              <option value="2000-5000">₹2000 - ₹5000</option>
              <option value="above-5000">Above ₹5000</option>
            </select>

            {/* Sort */}
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-brand-accent cursor-pointer hover:bg-white/10"
            >
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
