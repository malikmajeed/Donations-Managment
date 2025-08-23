export const addToWishList = (item) => {
    // Get existing cart from localStorage or initialize empty array

    const existingList = JSON.parse(localStorage.getItem('wish-list')) || [];
    
    // Check if item is already in cart
    const isAlreadyInList = existingList.find(cartItem => cartItem.id === item.id);
    
    if (!isAlreadyInList) {
      // Add item to cart
      const updatedList = [...existingList, item];
      localStorage.setItem('wish-list', JSON.stringify(updatedList));
      setIsInCart(true);
      
      // Show success feedback
      // You could add a toast notification here
      console.log('Added to cart:', item.name);
    } else {
      // Item already in cart
      console.log('Item already in cart');
    }
  };


  export const removeFromWishList = (item) => {
    const existingList = JSON.parse(localStorage.getItem('wish-list')) || [];
    const updatedList = existingList.filter(item => item.id !== item.id);
    localStorage.setItem('wish-list', JSON.stringify(updatedList));
  }