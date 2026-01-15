// Mock API functions for resort data management
// In a real app, these would connect to a backend API

let resortsData = [
  {
    id: "1",
    name: "Mountain View Resort",
    location: "Munnar, Kerala",
    description: "A serene mountain retreat with breathtaking views of tea plantations and misty valleys.",
    price: "₹3,500",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800"
    ],
    whatsapp: "919847124541"
  },
  {
    id: "2",
    name: "Beachside Paradise",
    location: "Varkala, Kerala",
    description: "Wake up to the sound of waves at this beautiful beachfront property with modern amenities.",
    price: "₹4,200",
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800"
    ],
    whatsapp: "919847124541"
  },
  {
    id: "3",
    name: "Backwater Bliss",
    location: "Alleppey, Kerala",
    description: "Experience authentic Kerala backwaters in this traditional houseboat-style resort.",
    price: "₹5,000",
    images: [
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800"
    ],
    whatsapp: "919847124541"
  }
];

// Load data from localStorage if available, otherwise use default
const loadResorts = () => {
  const stored = localStorage.getItem('koodam_resorts');
  if (stored) {
    try {
      resortsData = JSON.parse(stored);
    } catch (e) {
      console.error('Error loading resorts from localStorage:', e);
    }
  }
  return resortsData;
};

// Save data to localStorage
const saveResorts = (data) => {
  localStorage.setItem('koodam_resorts', JSON.stringify(data));
  resortsData = data;
};

// Initialize on load
loadResorts();

// API Functions
export const getResorts = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  return [...loadResorts()];
};

export const getResortById = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 100));
  const resorts = loadResorts();
  return resorts.find(r => r.id === id) || null;
};

export const addResort = async (resort) => {
  await new Promise(resolve => setTimeout(resolve, 200));
  const resorts = loadResorts();
  const newResort = {
    ...resort,
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    whatsapp: resort.whatsapp || '919847124541' // Default WhatsApp number
  };
  resorts.push(newResort);
  saveResorts(resorts);
  return newResort;
};

export const updateResort = async (id, updates) => {
  await new Promise(resolve => setTimeout(resolve, 200));
  const resorts = loadResorts();
  const index = resorts.findIndex(r => r.id === id);
  if (index === -1) throw new Error('Resort not found');
  
  resorts[index] = { 
    ...resorts[index], 
    ...updates,
    whatsapp: updates.whatsapp || '919847124541' // Ensure default WhatsApp number
  };
  saveResorts(resorts);
  return resorts[index];
};

export const deleteResort = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 200));
  const resorts = loadResorts();
  const filtered = resorts.filter(r => r.id !== id);
  saveResorts(filtered);
  return true;
};

