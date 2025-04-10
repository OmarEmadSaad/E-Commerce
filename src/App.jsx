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
  const [userData, setUserData] = useState(null);
  const [products, setProducts] = useState([]);
  const [changeProduct, setChangeProduct] = useState(false);

  const navigate = useNavigate();

  const getProducts = () => {
    const config = { method: "get", url: `${urlProducts}` };
    axios(config).then((res) => setProducts(res.data));
  };

  useEffect(() => {
    getProducts();
  }, [changeProduct]);

  const handleLogOut = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userData");
    localStorage.removeItem("userID");
    setIsLoggedIn(false);
    setUserInfo(null);
    navigate("/login");
  };

  useEffect(() => {
    const storedLogin = localStorage.getItem("isLoggedIn");
    const storedUser = localStorage.getItem("userData");

    if (storedLogin === "true" && storedUser) {
      setIsLoggedIn(true);
      setUserInfo(JSON.parse(storedUser));
    }
  }, []);

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
        userData,
        setUserData,
        changeProduct,
        setChangeProduct,
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
