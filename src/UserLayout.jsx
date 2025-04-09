import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import HeroSection from "./components/pages/HeroSection";
import Home from "./components/pages/home/compoents";
import Login from "./components/pages/auth/Login";
import SignUp from "./components/pages/auth/SignUp";
const UserLayout = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="sign-up" element={<SignUp />} />
      </Routes>
    </div>
  );
};

export default UserLayout;
