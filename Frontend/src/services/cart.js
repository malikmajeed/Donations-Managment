export const addToCart = ({ item }) => {
    // get cart from localStorage and parse
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log(item.amount);
  
    // check if the item already exists in the cart
    const itemIndex = cart.findIndex(i => i.id === item.id);
  
    if (itemIndex !== -1) {
      // if exists, increase quantity
      cart[itemIndex].quantity += 1;
    } else {
      // otherwise, add new item with quantity = 1
      cart.push({ ...item, quantity: 1 });
    }
  
    // save updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
  
  };
  


  export const removeFromCart = ({ item }) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = cart.filter(i => i.id !== item.id);
    localStorage.setItem('cart', JSON.stringify(updatedCart));

  }
  
  