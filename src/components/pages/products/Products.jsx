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

const Products = () => {
  const { products, setProducts } = useContext(AppContext);

  return (
    <div className="w-full px-2 flex flex-wrap justify-between gap-3">
      {products.length === 0 && (
        <div className="flex items-center justify-center min-h-screen w-full">
          <h1 className="text-center text-3xl font-bold">Loading 😇...</h1>
        </div>
      )}
      {products.map(({ title, price, description, image }, index) => (
        <Card className="w-60" key={index}>
          <CardHeader shadow={false} floated={false} className="h-48">
            <img
              src={image}
              alt="card-image"
              className="h-full w-full object-cover"
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
              fullWidth={true}
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
