import { useReducer } from "react";
import { createContext } from "react";
import Cookies from "js-cookie";

export const Store = createContext();
// define initial state
const initialState = {
  darkMode: Cookies.get("darkMode") === "ON" ? true : false,
  cart: {
    cartItems: Cookies.get("cartItems")
      ? JSON.parse(Cookies.get("cartItems"))
      : [],
  },
};
function reducer(state, action) {
  switch (action.type) {
    case "DARK_MODE_ON":
      return { ...state, darkMode: true };
    case "DARK_MODE_OFF":
      return { ...state, darkMode: false };
    case "ADD_ITEM_TO_CART": {
      const newItem = action.payload;
      const isItemExist = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );
      const cartItems = isItemExist
        ? state.cart.cartItems.map((item) =>
            item.name === isItemExist.name ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
        Cookies.set("cartItems", JSON.stringify(cartItems))
      return { ...state, cart: { ...state.cart, cartItems } };
    }

    default:
      return state;
  }
}
export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{children}</Store.Provider>;
}
