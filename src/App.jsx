import { Route, Routes, useNavigate } from "react-router-dom";
import UserLayout from "./UserLayout";
import AdminLayout from "./AdminLayout";
import { useEffect, useState } from "react";
import AppContext from "./components/Context/Context";
import axios from "axios";

const App = () => {
  const urlUser = import.meta.env.VITE_DB_UER;
  const urlProducts = import.meta.env.VITE_DB_PRODUCTS;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const isEmpty = cartItems.length === 0;

  const [products, setProducts] = useState([]);
  const [changeProduct, setChangeProduct] = useState(false);

  const navigate = useNavigate();

  const getProducts = () => {
    axios.get(urlProducts).then((res) => setProducts(res.data));
  };

  useEffect(() => {
    getProducts();
  }, [changeProduct]);

  useEffect(() => {
    const userId = localStorage.getItem("userID");

    if (userId) {
      fetch(`${urlUser}/${userId}`)
        .then((res) => {
          if (!res.ok) throw new Error("User not found");
          return res.json();
        })
        .then((data) => {
          setUserInfo(data);
          setCartItems(data.cart || []);
          setIsLoggedIn(true);
        })
        .catch(() => {
          setIsLoggedIn(false);
          setUserInfo(null);
          setCartItems([]);
          localStorage.removeItem("userID");
        });
    }
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("userID");
    setIsLoggedIn(false);
    setUserInfo(null);
    setCartItems([]);
    navigate("/login");
  };

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        cartItems,
        setCartItems,
        handleLogOut,
        products,
        setProducts,
        getProducts,
        isLoggedIn,
        setIsLoggedIn,
        userInfo,
        setUserInfo,
        urlUser,
        urlProducts,
        changeProduct,
        setChangeProduct,
        isEmpty,
      }}
    >
      <div className="dark:bg-black">
        <Routes>
          <Route path="/*" element={<UserLayout />} />
          <Route path="/admin/*" element={<AdminLayout />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
};

export default App;
