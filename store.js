import { createStore } from "redux";

const INITIAL_STATE = {
  inCart: [],
};
function products(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        inCart: [...state.inCart, action.payload],
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        inCart: [...state.inCart.find(({ id }) => id !== action.payload)],
      };

    default:
      return state;
  }
}

const store = createStore(products);
export default store;
