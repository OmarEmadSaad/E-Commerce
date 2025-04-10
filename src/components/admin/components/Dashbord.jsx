import { Link, useNavigate } from "react-router-dom";
import CartDashbordProducts from "./ProductsEdit/CartDashbordProducts";
import CartDashbordUsers from "./ProductsEdit/CartDashbordUsers";
import DataTableProducts from "./ProductsEdit/DataTableProducts";
import { Button } from "@material-tailwind/react";

const Dashbord = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex justify-evenly p-1 bg-gray-50">
        <Link to="/admin">Dashbord </Link>
        <Link to="/admin/users">Users</Link>
        <Link to="/admin/products">Products</Link>
      </div>

      <div className="flex justify-evenly  gap-10 flex-col lg:flex-row lg:content-center lg:h-full p-16 ">
        <CartDashbordProducts />
        <CartDashbordUsers />
      </div>
    </div>
  );
};

export default Dashbord;
