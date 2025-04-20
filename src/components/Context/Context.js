import { createContext } from "react";

const AppContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  userInfo: null,
  setUserInfo: () => {},
  getProducts: () => {},
  handleLogOut: () => {},
  products: [],
  setProducts: () => {},
  changeProduct: false,
  setChangeProduct: () => {},
  cartItems: [],
  setCartItems: () => {},
});

export default AppContext;
