import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
// import Home from "./components/pages/home/compoents";
import UserLayout from "./UserLayout";
import AdminLayout from "./AdminLayout";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/*" element={<UserLayout />} />
        <Route path="/admin/*" element={<AdminLayout />} />
      </Routes>
    </div>
  );
};

export default App;
