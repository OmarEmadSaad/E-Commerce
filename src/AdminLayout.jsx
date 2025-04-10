import { Route, Routes } from "react-router-dom";
import Dashbord from "./components/admin/components/Dashbord";
import ViewProducts from "./components/admin/components/ProductsEdit/ViewProducts";
import Adminheader from "./components/admin/Adminheader";
import DataTableProducts from "./components/admin/components/ProductsEdit/DataTableProducts";
import EditProducts from "./components/admin/components/ProductsEdit/EditProducts";
import UserTable from "./components/admin/components/UserEdit/UserTable";

const AdminLayout = () => {
  return (
    <div>
      <Adminheader />

      <Routes>
        {/* <Route index element={<Dashbord />} /> */}
        <Route path="products/:id" element={<ViewProducts />} />
        <Route path="products/edit/:id" element={<EditProducts />} />
        <Route path="users" element={<UserTable />} />

        <Route path="/" element={<Dashbord />} />
        {/* <Route path="admin/users" element={<Users />} /> */}
        <Route path="products" element={<DataTableProducts />} />
      </Routes>
    </div>
  );
};

export default AdminLayout;
