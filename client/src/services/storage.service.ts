export const storageService = {
  save: <T>(key: string, data: T): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error(`Error saving to localStorage for key ${key}:`, e);
    }
  },

  load: <T>(key: string): T | null => {
    if (typeof window === 'undefined') return null;
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      console.error(`Error loading from localStorage for key ${key}:`, e);
      return null;
    }
  },

  clear: (key: string): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error(`Error clearing localStorage for key ${key}:`, e);
    }
  }
};
