// Local storage utilities
export const storage = {
  // Set item in localStorage
  set: (key, value) => {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
      return true;
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      return false;
    }
  },

  // Get item from localStorage
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return defaultValue;
    }
  },

  // Remove item from localStorage
  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing from localStorage:', error);
      return false;
    }
  },

  // Clear all localStorage
  clear: () => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  },

  // Check if key exists
  has: (key) => {
    return localStorage.getItem(key) !== null;
  },

  // Get all keys
  keys: () => {
    return Object.keys(localStorage);
  },
};

// Session storage utilities
export const sessionStorage = {
  // Set item in sessionStorage
  set: (key, value) => {
    try {
      const serializedValue = JSON.stringify(value);
      window.sessionStorage.setItem(key, serializedValue);
      return true;
    } catch (error) {
      console.error('Error saving to sessionStorage:', error);
      return false;
    }
  },

  // Get item from sessionStorage
  get: (key, defaultValue = null) => {
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error reading from sessionStorage:', error);
      return defaultValue;
    }
  },

  // Remove item from sessionStorage
  remove: (key) => {
    try {
      window.sessionStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing from sessionStorage:', error);
      return false;
    }
  },

  // Clear all sessionStorage
  clear: () => {
    try {
      window.sessionStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing sessionStorage:', error);
      return false;
    }
  },
};

// Specific storage helpers
export const authStorage = {
  setToken: (token) => storage.set('authToken', token),
  getToken: () => storage.get('authToken'),
  removeToken: () => storage.remove('authToken'),
  setUser: (user) => storage.set('user', user),
  getUser: () => storage.get('user'),
  removeUser: () => storage.remove('user'),
  clear: () => {
    storage.remove('authToken');
    storage.remove('user');
  },
};

export const cartStorage = {
  setCart: (cart) => storage.set('cart', cart),
  getCart: () => storage.get('cart', []),
  clearCart: () => storage.remove('cart'),
  addItem: (item) => {
    const cart = cartStorage.getCart();
    const existingItem = cart.find(i => i.id === item.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...item, quantity: 1 });
    }
    
    cartStorage.setCart(cart);
    return cart;
  },
  removeItem: (itemId) => {
    const cart = cartStorage.getCart();
    const updatedCart = cart.filter(item => item.id !== itemId);
    cartStorage.setCart(updatedCart);
    return updatedCart;
  },
  updateQuantity: (itemId, quantity) => {
    const cart = cartStorage.getCart();
    const item = cart.find(i => i.id === itemId);
    
    if (item) {
      if (quantity <= 0) {
        return cartStorage.removeItem(itemId);
      } else {
        item.quantity = quantity;
        cartStorage.setCart(cart);
        return cart;
      }
    }
    
    return cart;
  },
};
