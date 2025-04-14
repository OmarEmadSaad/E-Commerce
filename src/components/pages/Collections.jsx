import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

const Collections = () => {
  return (
    <div className="w-full py-16 bg-gray-100">
      <div className="container mx-auto px-6 text-center">
        <Typography variant="h4" color="blue-gray" className="mb-12">
          Our Collections
        </Typography>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <Card className="relative group">
            <CardHeader className="relative overflow-hidden h-72">
              <img
                src="https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg"
                alt="Clothing Collection"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-all duration-500"
              />
            </CardHeader>
            <CardBody className="absolute bottom-0 left-0 right-0 p-6 bg-black bg-opacity-50 text-white">
              <Typography variant="h5" className="mb-2">
                Clothing Collections 2023
              </Typography>
              <Typography variant="small" className="mb-4">
                A fresh collection of clothing for 2023, featuring the latest
                fashion trends.
              </Typography>
              <Link to="/clothing">
                <Typography
                  variant="small"
                  className="text-red-600 hover:text-red-800"
                >
                  Shop Now
                </Typography>
              </Link>
            </CardBody>
          </Card>

          <Card className="relative group">
            <CardHeader className="relative overflow-hidden h-72">
              <img
                src="https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg"
                alt="Shoes Collection"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-all duration-500"
              />
            </CardHeader>
            <CardBody className="absolute bottom-0 left-0 right-0 p-6 bg-black bg-opacity-50 text-white">
              <Typography variant="h5" className="mb-2">
                Shoes Spring 2023
              </Typography>
              <Typography variant="small" className="mb-4">
                Discover our Spring 2023 collection of shoes, designed for
                comfort and style.
              </Typography>
              <Link to="/shoes">
                <Typography
                  variant="small"
                  className="text-red-600 hover:text-red-800"
                >
                  Shop Now
                </Typography>
              </Link>
            </CardBody>
          </Card>

          {/* قسم الإكسسوارات */}
          <Card className="relative group">
            <CardHeader className="relative overflow-hidden h-72">
              <img
                src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
                alt="Accessories Collection"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-all duration-500"
              />
            </CardHeader>
            <CardBody className="absolute bottom-0 left-0 right-0 p-6 bg-black bg-opacity-50 text-white">
              <Typography variant="h5" className="mb-2">
                Accessories
              </Typography>
              <Typography variant="small" className="mb-4">
                A wide range of stylish accessories to complete your look.
              </Typography>
              <Link to="/accessories">
                <Typography
                  variant="small"
                  className="text-red-600 hover:text-red-800"
                >
                  Shop Now
                </Typography>
              </Link>
            </CardBody>
          </Card>

          {/* قسم إضافي */}
          <Card className="relative group">
            <CardHeader className="relative overflow-hidden h-72">
              <img
                src="https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg"
                alt="Accessories Collection"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-all duration-500"
              />
            </CardHeader>
            <CardBody className="absolute bottom-0 left-0 right-0 p-6 bg-black bg-opacity-50 text-white">
              <Typography variant="h5" className="mb-2">
                Accessories
              </Typography>
              <Typography variant="small" className="mb-4">
                A wide range of stylish accessories to complete your look.
              </Typography>
              <Link to="/accessories">
                <Typography
                  variant="small"
                  className="text-red-600 hover:text-red-800"
                >
                  Shop Now
                </Typography>
              </Link>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Collections;
