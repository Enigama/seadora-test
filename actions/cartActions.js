export const addToCartAction = (id) => {
  return { type: "ADD_TO_CART", payload: id };
};

export const removeFromCartAction = (id) => {
  return { type: "REMOVE_FROM_CART", payload: id };
};
