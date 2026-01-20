import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AdminForm = ({ resort = null, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    category: 'budget',
    description: '',
    price: '',
    whatsapp: '',
  });

  const [images, setImages] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (resort) {
      setFormData({
        name: resort.name || '',
        location: resort.location || '',
        category: resort.category || 'budget',
        description: resort.description || '',
        price: resort.price || '',
        whatsapp: resort.whatsapp || '',
      });
      setImages(resort.images || []);
    }
  }, [resort]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setIsProcessing(true);
    
    // Cloudinary configuration
    const cloudName = 'dcfcq3cji';
    const uploadPreset = 'kyte_uploads';

    try {
      const uploadPromises = files.map(file => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', uploadPreset);

        return fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: 'POST',
          body: formData
        })
        .then(response => response.json())
        .then(data => {
          if (data.secure_url) {
            return data.secure_url;
          } else {
            console.error('Upload failed:', data);
            throw new Error('Upload failed');
          }
        });
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      setImages(prev => [...prev, ...uploadedUrls]);
    } catch (error) {
      console.error("Error uploading images", error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ 
      ...formData, 
      images,
      price: Number(formData.price),
      whatsapp: '919847124541' // Hardcoded default number
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
          Property Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent"
          placeholder="Enter property name"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-white/80 mb-2">
            Location *
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent"
            placeholder="City, Place"
          />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-white/80 mb-2">
            Category *
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent cursor-pointer"
          >
            <option value="budget" className="bg-brand-dark">Budget Friendly</option>
            <option value="mid" className="bg-brand-dark">Mid-Range</option>
            <option value="luxury" className="bg-brand-dark">Luxury</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Price */}
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-white/80 mb-2">
            Price per Night (₹) *
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent"
            placeholder="2500"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-white/80 mb-2">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent resize-none"
          placeholder="Describe the property..."
        />
      </div>

      {/* Images Upload */}
      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">
          Property Images
        </label>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {images.map((img, index) => (
            <div key={index} className="relative aspect-video rounded-lg overflow-hidden border border-white/10 group">
              <img src={img} alt={`Preview ${index}`} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
          
          <label className="flex flex-col items-center justify-center aspect-video rounded-lg border-2 border-dashed border-white/20 hover:border-brand-accent hover:bg-white/5 transition-all cursor-pointer">
            <input 
              type="file" 
              multiple 
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden" 
            />
            <svg className="w-8 h-8 text-white/40 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            <span className="text-xs text-white/60">Upload Images</span>
          </label>
        </div>
        {isProcessing && <p className="text-xs text-brand-accent animate-pulse">Processing images...</p>}
      </div>

      {/* Actions */}
      <div className="flex gap-4 pt-4 border-t border-white/10">
        <motion.button
          type="submit"
          disabled={isProcessing}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 px-6 py-3 bg-brand-accent hover:bg-brand-accent-hover text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {resort ? 'Update Property' : 'Add Property'}
        </motion.button>
        <motion.button
          type="button"
          onClick={onCancel}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-colors"
        >
          Cancel
        </motion.button>
      </div>
    </form>
  );
};

export default AdminForm;

