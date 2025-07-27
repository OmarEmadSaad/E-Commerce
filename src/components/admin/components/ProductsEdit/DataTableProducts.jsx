import { Card, Typography, Avatar, Button } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { useContext } from "react";
import AppContext from "../../../Context/Context";

const TABLE_HEAD = ["img", "Name", "Price", "Action"];

const DataTableProducts = () => {
  const { products, setProducts, getProducts } = useContext(AppContext);
  const urlProducts = import.meta.env.VITE_DB_PRODUCTS;
  const navigate = useNavigate();

  const delProduct = ({ title, id }) => {
    Swal.fire({
      title: `Are you sure you want to delete ${title.slice(0, 5)}?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((res) => {
      if (res.isConfirmed) {
        axios
          .get(urlProducts)
          .then((response) => {
            const productsData = response.data || [];
            const updatedProducts = productsData.filter(
              (product) => product.id !== id
            );

            return axios.put(urlProducts, updatedProducts, {
              headers: { "Content-Type": "application/json" },
            });
          })
          .then(() => {
            setProducts(products.filter((product) => product.id !== id));
            Swal.fire({
              icon: "success",
              title: "Product deleted successfully!",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch((error) => {
            console.error("Error deleting product:", error);
            Swal.fire({
              icon: "error",
              title: "Failed to delete product",
              text: error.message,
            });
          });
      }
    });
  };

  return (
    <div className="w-full mt-3">
      <div className="mt-4 text-4xl items-center text-center">
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
            {Array.isArray(products) && products.length > 0 ? (
              products.map(({ title, price, image, id }, index) => {
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
                        <Avatar
                          src={image}
                          alt="Product image"
                          loading="lazy"
                        />
                      </Typography>
                    </td>

                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {title ? title.slice(0, 15) : "No title"}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {price ? `${price} $` : "No price"}
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
              })
            ) : (
              <tr>
                <td colSpan={4} className="p-4 text-center">
                  No products available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default DataTableProducts;
