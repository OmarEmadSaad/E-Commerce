import { useContext } from "react";
import AppContext from "../../../Context/Context";
import React from "react";
import { Input, Textarea, Button, Typography } from "@material-tailwind/react";
import { useParams } from "react-router-dom";

const EditProducts = () => {
  const { id } = useParams();
  const { products } = useContext(AppContext);
  const product = products.find((p) => p.id == id);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg flex flex-col gap-4">
      <Typography variant="h5" color="blue-gray" className="text-center">
        Edit Product
      </Typography>

      <Input label="Product Title" type="text" />

      <div className="flex flex-col sm:flex-row gap-4">
        <Input label="Product Price" type="number" className="w-full" />
        <Input label="Currency" value="$" readOnly className="w-full" />
      </div>

      <Input label="Product Category" type="text" />

      <Textarea label="Product Description" type="text" />

      <Input label="Product Image" defaultValue="https://" type="text" />
      <Typography variant="small" color="gray">
        It have to be "https://url"
      </Typography>

      <div className="flex flex-col sm:flex-row gap-4">
        <Input label="Product Rate" type="number" className="w-full" />
        <Input label="Rating Count" type="number" className="w-full" />
      </div>

      <div className="text-center">
        <Button>Edit Product</Button>
      </div>
    </div>
  );
};

export default EditProducts;
