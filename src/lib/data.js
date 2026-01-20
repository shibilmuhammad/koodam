import { properties as initialProperties } from '../data/properties';

const STORAGE_KEY = 'kyte_properties';

// Helper to get data from storage
const getData = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : initialProperties;
};

// Helper to save data to storage
const saveData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  // Dispatch a custom event so other components can react
  window.dispatchEvent(new Event('storage-update'));
};

export const getResorts = async () => {
  // Simulate network delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getData());
    }, 500);
  });
};

export const addResort = async (resort) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const current = getData();
      const newResort = {
        ...resort,
        id: crypto.randomUUID(),
        price: Number(resort.price)
      };
      saveData([...current, newResort]);
      resolve(newResort);
    }, 500);
  });
};

export const updateResort = async (id, updates) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const current = getData();
      const updated = current.map(item => 
        item.id === id ? { ...item, ...updates, price: Number(updates.price) } : item
      );
      saveData(updated);
      resolve(updated.find(item => item.id === id));
    }, 500);
  });
};

export const deleteResort = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const current = getData();
      const filtered = current.filter(item => item.id !== id);
      saveData(filtered);
      resolve(true);
    }, 500);
  });
};
