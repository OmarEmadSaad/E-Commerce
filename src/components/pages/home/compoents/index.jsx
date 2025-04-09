import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import Collections from "../../Collections";
import HeroSection from "../../HeroSection";
import Footer from "../../../Footer";

const Home = () => {
  return (
    <div>
      <div className="w-full h-screen bg-gray-100 flex justify-center items-center">
        <Card className="w-full max-w-7xl h-full flex flex-col lg:flex-row p-4 lg:p-8">
          <CardBody className="flex flex-col justify-center w-full lg:w-1/2 p-4 lg:p-8 text-center lg:text-left">
            <Typography
              variant="h6"
              color="gray"
              className="mb-4 uppercase text-red-800"
            >
              SUMMER COLLECTION
            </Typography>
            <Typography variant="h4" color="blue-gray" className="mb-2 ">
              Fall - Winter Collections 2023
            </Typography>
            <Typography color="gray" className="mb-8 font-normal">
              A specialist label creating luxury essentials. Ethically crafted
              with an unwavering commitment to exceptional quality.
            </Typography>
            <Button
              variant="filled"
              color="red"
              className="w-40 text-white text-lg font-medium py-3 mx-auto lg:mx-0"
            >
              SHOP NOW
            </Button>
          </CardBody>

          <CardHeader
            shadow={false}
            floated={false}
            className="m-0 w-full lg:w-1/2 shrink-0 rounded-8 mt-4 lg:mt-0"
          >
            <img
              src="https://xsuit.com/cdn/shop/articles/Xsuit_Style_Main_Image.jpg?v=1631178638"
              alt="card-image"
              className="w-full object-cover h-60 sm:h-72 md:h-80 lg:h-[40rem] lg:w-[50rem]"
            />
          </CardHeader>
        </Card>
      </div>
      <HeroSection />
      <div className="w-full relative bg-seperator text-white py-4 flex flex-col items-center gap-4">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo1Duxp1wt-bZYTa7926-HaOymVMIc_CEndw&s"
          alt="Banner"
          className="w-full max-h-32 object-cover"
        />
        <h2 className="absolute inset-0 flex items-center justify-center text-center text-xl sm:text-2xl md:text-3xl font-semibold leading-snug px-4">
          Free shipping, 30-day return or refund guarantee
        </h2>
      </div>
      <Collections />
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
