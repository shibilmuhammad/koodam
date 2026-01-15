import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AdminForm = ({ resort = null, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    price: '',
    images: [],
  });

  const [imageUrls, setImageUrls] = useState(['']);

  useEffect(() => {
    if (resort) {
      setFormData({
        name: resort.name || '',
        location: resort.location || '',
        description: resort.description || '',
        price: resort.price || '',
        images: resort.images || [],
      });
      setImageUrls(resort.images && resort.images.length > 0 ? resort.images : ['']);
    }
  }, [resort]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUrlChange = (index, value) => {
    const newUrls = [...imageUrls];
    newUrls[index] = value;
    setImageUrls(newUrls);
  };

  const addImageField = () => {
    setImageUrls([...imageUrls, '']);
  };

  const removeImageField = (index) => {
    if (imageUrls.length > 1) {
      const newUrls = imageUrls.filter((_, i) => i !== index);
      setImageUrls(newUrls);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const images = imageUrls.filter((url) => url.trim() !== '');
    // Use default WhatsApp number for all resorts
    onSave({ ...formData, images, whatsapp: '919847124541' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
          Resort Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
          placeholder="Enter resort name"
        />
      </div>

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
          className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
          placeholder="City, State"
        />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-white/80 mb-2">
          Description *
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
          className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 resize-none"
          placeholder="Describe the resort..."
        />
      </div>

      {/* Price */}
      <div>
        <label htmlFor="price" className="block text-sm font-medium text-white/80 mb-2">
          Price per Night *
        </label>
        <input
          type="text"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
          placeholder="₹3,500"
        />
      </div>

      {/* Images */}
      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">
          Image URLs *
        </label>
        {imageUrls.map((url, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="url"
              value={url}
              onChange={(e) => handleImageUrlChange(index, e.target.value)}
              className="flex-1 px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
              placeholder="https://example.com/image.jpg"
            />
            {imageUrls.length > 1 && (
              <button
                type="button"
                onClick={() => removeImageField(index)}
                className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addImageField}
          className="mt-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm"
        >
          + Add Another Image
        </button>
      </div>

      {/* Actions */}
      <div className="flex gap-4 pt-4">
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg transition-colors"
        >
          {resort ? 'Update Resort' : 'Add Resort'}
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

