import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CartDashbordProducts = () => {
  const [lastProducts, setLastProdcuts] = useState("");
  const [numOfProducts, setNumOfProducts] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const urlProducts = import.meta.env.VITE_DB_PRODUCTS;

    fetch(`${urlProducts}`)
      .then((res) => res.json())
      .then((data) => {
        const lastprodcuts = data[data.length - 1].title;
        const numOfproducts = data.length;
        setLastProdcuts(lastprodcuts);
        setNumOfProducts(numOfproducts);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  return (
    <div>
      <Card
        color="gray"
        variant="gradient"
        className="w-full max-w-[20rem] p-8"
      >
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 mb-8 rounded-none border-b border-white/10 pb-8 text-center"
        >
          <Typography
            variant="h1"
            color="white"
            className="mt-6 flex justify-center gap-1 text-7xl font-normal"
          >
            <span className="mt-2 text-4xl">Products</span>
          </Typography>
        </CardHeader>
        <CardBody className="p-0 flex flex-col gap-5 ">
          <h1>Number Of Products: {numOfProducts}</h1>
          <h1>Last Add Products : {lastProducts.slice(0, 8)}</h1>
        </CardBody>

        <CardFooter className="mt-12 p-0">
          <Button
            size="lg"
            color="white"
            className="hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
            ripple={false}
            fullWidth={true}
            onClick={() => {
              navigate("/admin/products");
            }}
          >
            Check Products
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CartDashbordProducts;
