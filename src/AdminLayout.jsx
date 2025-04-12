import { Route, Routes } from "react-router-dom";
import Dashbord from "./components/admin/components/Dashbord";
import ViewProducts from "./components/admin/components/ProductsEdit/ViewProducts";
import Adminheader from "./components/admin/Adminheader";
import DataTableProducts from "./components/admin/components/ProductsEdit/DataTableProducts";
import EditProducts from "./components/admin/components/ProductsEdit/EditProducts";
import UserTable from "./components/admin/components/UserEdit/UserTable";
import UserProfile from "./components/admin/components/UserEdit/UserProfile";
import AddProducts from "./components/admin/components/ProductsEdit/AddProducts";

const AdminLayout = () => {
  return (
    <div>
      <Adminheader />

      <Routes>
        {/* <Route index element={<Dashbord />} /> */}
        <Route path="products/:id" element={<ViewProducts />} />
        <Route path="products/edit/:id" element={<EditProducts />} />
        <Route path="users" element={<UserTable />} />
        <Route path="users/view/:id" element={<UserProfile />} />
        <Route path="/" element={<Dashbord />} />
        <Route path="products" element={<DataTableProducts />} />
        <Route path="add/products" element={<AddProducts />} />
      </Routes>
    </div>
  );
};

export default AdminLayout;
