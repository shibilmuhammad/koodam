import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getResorts, addResort, updateResort, deleteResort } from '../lib/data';
import AdminForm from '../components/AdminForm';
import Modal from '../components/Modal';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [resorts, setResorts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingResort, setEditingResort] = useState(null);

  // Simple password protection (in production, use proper authentication)
  const ADMIN_PASSWORD = 'koodam2024';

  useEffect(() => {
    // Check if already authenticated
    const authStatus = localStorage.getItem('koodam_admin_auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      fetchResorts();
    } else {
      setLoading(false);
    }
  }, []);

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

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('koodam_admin_auth', 'true');
      fetchResorts();
    } else {
      alert('Incorrect password');
      setPassword('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('koodam_admin_auth');
    setPassword('');
  };

  const handleAddNew = () => {
    setEditingResort(null);
    setIsModalOpen(true);
  };

  const handleEdit = (resort) => {
    setEditingResort(resort);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this resort?')) {
      try {
        await deleteResort(id);
        fetchResorts();
      } catch (error) {
        console.error('Error deleting resort:', error);
        alert('Failed to delete resort');
      }
    }
  };

  const handleSave = async (resortData) => {
    try {
      if (editingResort) {
        await updateResort(editingResort.id, resortData);
      } else {
        await addResort(resortData);
      }
      setIsModalOpen(false);
      setEditingResort(null);
      fetchResorts();
    } catch (error) {
      console.error('Error saving resort:', error);
      alert('Failed to save resort');
    }
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Admin Panel</h1>
          <p className="text-white/60 mb-6">Please enter the password to continue</p>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 mb-4"
              autoFocus
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg transition-colors"
            >
              Login
            </motion.button>
          </form>
        </motion.div>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen pt-16 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Admin Panel</h1>
            <p className="text-white/60">Manage your resorts</p>
          </div>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <motion.button
              onClick={handleAddNew}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg transition-colors"
            >
              + Add New Resort
            </motion.button>
            <motion.button
              onClick={handleLogout}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-colors"
            >
              Logout
            </motion.button>
          </div>
        </div>

        {/* Resorts List */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-4 border-teal-400 border-t-transparent rounded-full"
            />
          </div>
        ) : resorts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-white/60 text-lg mb-4">No resorts added yet.</p>
            <motion.button
              onClick={handleAddNew}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg transition-colors"
            >
              Add Your First Resort
            </motion.button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resorts.map((resort) => (
              <motion.div
                key={resort.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-teal-400/50 transition-all"
              >
                {resort.images && resort.images.length > 0 && (
                  <img
                    src={resort.images[0]}
                    alt={resort.name}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/800x400/0A0A0A/14b8a6?text=Resort+Image';
                    }}
                  />
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-1">{resort.name}</h3>
                  <p className="text-white/60 text-sm mb-4">{resort.location}</p>
                  <p className="text-white/80 text-sm mb-4 line-clamp-2">{resort.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-teal-400 font-bold">{resort.price}</span>
                    <span className="text-white/40 text-xs">per night</span>
                  </div>
                  <div className="flex gap-2">
                    <motion.button
                      onClick={() => handleEdit(resort)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 px-4 py-2 bg-teal-500/20 hover:bg-teal-500/30 text-teal-400 rounded-lg transition-colors text-sm font-medium"
                    >
                      Edit
                    </motion.button>
                    <motion.button
                      onClick={() => handleDelete(resort.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors text-sm font-medium"
                    >
                      Delete
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Modal for Add/Edit */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingResort(null);
        }}
        title={editingResort ? 'Edit Resort' : 'Add New Resort'}
      >
        <AdminForm
          resort={editingResort}
          onSave={handleSave}
          onCancel={() => {
            setIsModalOpen(false);
            setEditingResort(null);
          }}
        />
      </Modal>
    </div>
  );
};

export default Admin;

