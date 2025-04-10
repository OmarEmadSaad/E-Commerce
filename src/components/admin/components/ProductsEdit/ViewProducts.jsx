import { Link, useParams } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useContext } from "react";
import AppContext from "../../../Context/Context";

const ViewProducts = () => {
  const { id } = useParams();
  const { products } = useContext(AppContext);
  const product = products.find((p) => p.id == id);

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen p-4 bg-gray-50">
        <Typography variant="h5" color="red">
          Product Not Found
        </Typography>
      </div>
    );
  }
  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-50">
      <Card className="w-full max-w-4xl flex flex-col md:flex-row">
        <CardHeader
          shadow={false}
          floated={false}
          className="m-0 w-2/5 shrink-0 rounded-r-none"
        >
          <img
            src={product.image}
            alt="card-image"
            className="h-full w-full object-cover"
          />
        </CardHeader>
        <CardBody>
          <Typography variant="h4" color="blue-gray" className="mb-2">
            {product.title}
          </Typography>

          <Typography color="gray" className="mb-8 font-normal">
            price: {product.price} $
          </Typography>

          <Typography color="gray" className="mb-8 font-normal">
            {product.description}
          </Typography>
          <Link to="/admin/products">
            <Button>Back to Product</Button>
          </Link>
        </CardBody>
      </Card>
    </div>
  );
};

export default ViewProducts;
