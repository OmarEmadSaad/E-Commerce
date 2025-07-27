import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useContext } from "react";
import AppContext from "../../Context/Context";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const navigate = useNavigate();
  const { products, setCartItems } = useContext(AppContext);
  const urlUser = import.meta.env.VITE_DB_UER;

  const handleAddToCart = (product) => {
    const userId = localStorage.getItem("userID");

    if (!userId) {
      navigate("/login");
      return;
    }

    // Get all users as object
    fetch(urlUser)
      .then((res) => res.json())
      .then((data) => {
        // Get the user entry by matching id
        const userKey = Object.keys(data).find((key) => data[key].id == userId);

        if (!userKey) {
          console.error("User not found");
          return;
        }

        const userData = data[userKey];
        const currentCart = Array.isArray(userData.cart) ? userData.cart : [];

        const existingProduct = currentCart.find(
          (item) => item.id === product.id
        );

        let updatedCart;

        if (existingProduct) {
          updatedCart = currentCart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          updatedCart = [...currentCart, { ...product, quantity: 1 }];
        }

        // Patch only the user node
        fetch(
          `https://e-commerce-db-4c37a-default-rtdb.firebaseio.com/users/${userKey}.json`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ cart: updatedCart }),
          }
        ).then(() => {
          setCartItems(updatedCart);
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="w-full px-2 flex flex-wrap justify-center sm:justify-between gap-3 mb-3">
      {products.length === 0 && (
        <div className="flex items-center justify-center min-h-screen w-full dark:text-white">
          <h1 className="text-center text-3xl font-bold">Loading 😇...</h1>
        </div>
      )}
      {products.map(({ title, id, price, description, image }) => (
        <Card className="w-60" key={id}>
          <CardHeader shadow={false} floated={false} className="h-48">
            <img
              src={image}
              alt="card-image"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </CardHeader>
          <CardBody>
            <div className="mb-2 flex items-center justify-between">
              <Typography color="blue-gray" className="font-medium text-sm">
                {title.slice(0, 5)}
              </Typography>
              <Typography color="blue-gray" className="font-medium text-sm">
                ${price}
              </Typography>
            </div>
            <Typography
              variant="small"
              color="gray"
              className="font-normal opacity-75 text-xs"
            >
              {description.slice(0, 50)}
            </Typography>
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              ripple={false}
              fullWidth
              onClick={() => handleAddToCart({ id, title, price, image })}
              className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
            >
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default Products;
