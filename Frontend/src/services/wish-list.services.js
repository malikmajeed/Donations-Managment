export const addToWishList = ({ item }) => {
  // get cart from localStorage and parse
  const wishList = JSON.parse(localStorage.getItem('wish-list')) || [];


  // check if the item already exists in the cart
  const itemIndex = wishList.findIndex(i => i.id === item.id);

  if (itemIndex !== -1) {
    // if exists, increase quantity
    toast.info("Already in Wish List")
  } else {
    // otherwise, add new item with quantity = 1
    wishList.push({ ...item, quantity: 1 });
    toast.success("Added to Wish List")
  }

  // save updated cart back to localStorage
  localStorage.setItem('wish-list', JSON.stringify(wishList));

};



export const removeFromCart = ({ item }) => {
  const cart = JSON.parse(localStorage.getItem('wish-list')) || [];
  const updatedCart = cart.filter(i => i.id !== item.id);
  localStorage.setItem('wish-list', JSON.stringify(updatedCart));

}

