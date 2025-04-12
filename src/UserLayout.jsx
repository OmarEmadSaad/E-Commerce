import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/pages/home/compoents";
import Login from "./components/pages/auth/Login";
import SignUp from "./components/pages/auth/SignUp";
import Footer from "./components/Footer";
import Products from "./components/pages/products/Products";
import Profile from "./components/pages/auth/Profile";
const UserLayout = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="products" element={<Products />} />
        <Route path="profile" element={<Profile />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default UserLayout;
