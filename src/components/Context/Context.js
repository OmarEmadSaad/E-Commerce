import { createContext } from "react";
const AppContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  userInfo: [],
  setUserInfo: () => {},
  userData: [],
  setUserData: () => {},
  getProducts: () => {},
  products: [],
  setProducts: [],
});
export default AppContext;
