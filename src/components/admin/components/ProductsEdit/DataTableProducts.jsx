import { Card, Typography, Avatar, Button } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
const TABLE_HEAD = ["img", "Name", "Price", "Action"];
import { useContext } from "react";
import AppContext from "../../../Context/Context";

const DataTableProducts = () => {
  const { products, changeProduct, setChangeProduct } = useContext(AppContext);
  const urlProducts = import.meta.env.VITE_DB_PRODUCTS;
  const navigate = useNavigate();

  const delProduct = ({ title, id }) => {
    Swal.fire({
      title: `Are you sure to delete ${title.slice(0, 5)}`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((res) => {
      if (res.isConfirmed) {
        axios({
          method: "delete",
          url: `${urlProducts}/${id}`,
        }).then((res) => {
          if (res.status == 200) {
            setChangeProduct(!changeProduct);
          }
        });
      }
    });
  };
  return (
    <div className="w-full mt-3">
      <div className="mt-4 text-4xl items-center text-center ">
        <h1 className="text-center">Products</h1>

        <Button color="green" className="mt-4">
          <Link to={"/admin/add/products"}>Add Products</Link>
        </Button>
      </div>
      <Card className="h-full w-full overflow-auto mt-4">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className={`border-b border-blue-gray-100 bg-blue-gray-50 p-4 ${
                    head === "Action" ? "text-center" : ""
                  }`}
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map(({ title, price, image, id }, index) => {
              const isLast = index === products.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={title}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      <Avatar src={image} alt="error photo" loading="lazy" />
                    </Typography>
                  </td>

                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {title.slice(0, 15)}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {price} $
                    </Typography>
                  </td>

                  <td className={classes}>
                    <Typography
                      as="div"
                      className="w-full flex items-center justify-center gap-4"
                    >
                      <Button size="sm" color="blue">
                        <Link to={`/admin/products/${id}`}>View</Link>
                      </Button>
                      <Button size="sm" color="yellow">
                        <Link to={`/admin/products/edit/${id}`}>Edit</Link>
                      </Button>
                      <Button
                        size="sm"
                        color="red"
                        onClick={() => delProduct({ title, id })}
                      >
                        Delete
                      </Button>
                    </Typography>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default DataTableProducts;
