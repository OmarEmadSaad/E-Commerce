import { createContext } from "react";
const AppContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  userInfo: null,
  setUserInfo: () => {},
  userData: null,
  setUserData: () => {},
  getProducts: () => {},
  handleLogOut: () => {},
  products: [],
  setProducts: () => {},
  changeProduct: false,
  setChangeProduct: false,
});

export default AppContext;
