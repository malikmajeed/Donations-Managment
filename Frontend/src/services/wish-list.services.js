export const addToWishList = ({ item }) => {
  // get wishlist from localStorage and parse
  const wishList = JSON.parse(localStorage.getItem('wishlist')) || [];

  // check if the item already exists in the wishlist
  const itemIndex = wishList.findIndex(i => i.id === item.id);

  if (itemIndex !== -1) {
    // if exists, don't add again
    return false;
  } else {
    // otherwise, add new item with quantity = 1
    wishList.push({ ...item, quantity: 1 });
  }

  // save updated wishlist back to localStorage
  localStorage.setItem('wishlist', JSON.stringify(wishList));
  return true;
};

export const removeFromWishList = ({ item }) => {
  const wishList = JSON.parse(localStorage.getItem('wishlist')) || [];
  const updatedWishList = wishList.filter(i => i.id !== item.id);
  localStorage.setItem('wishlist', JSON.stringify(updatedWishList));
}

