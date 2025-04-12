import { useState, useContext } from "react";
import { Input, Textarea, Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AppContext from "../../../Context/Context";

const AddProducts = () => {
  const urlProducts = import.meta.env.VITE_DB_PRODUCTS;
  const navigate = useNavigate();

  const { setProducts, products } = useContext(AppContext);

  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    image: "",
    rate: "",
    count: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleAddProduct = () => {
    fetch(urlProducts, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: form.title,
        price: form.price,
        category: form.category,
        description: form.description,
        image: form.image,
        rating: {
          rate: form.rate,
          count: form.count,
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setProducts([...products, data]);

        Swal.fire({
          icon: "success",
          title: "Product added successfully!",
          showConfirmButton: false,
          timer: 1500,
        });

        setTimeout(() => {
          navigate("/admin/products");
        }, 1600);
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Failed to add product",
          text: error.message,
        });
      });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg flex flex-col gap-4">
      <Typography variant="h5" color="blue-gray" className="text-center">
        Add Product
      </Typography>

      <Input
        label="Product Title"
        type="text"
        name="title"
        value={form.title}
        onChange={handleChange}
      />

      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          label="Product Price"
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
        />
        <Input label="Currency" value="$" readOnly className="w-full" />
      </div>

      <Input
        label="Product Category"
        type="text"
        name="category"
        value={form.category}
        onChange={handleChange}
      />

      <Textarea
        label="Product Description"
        type="text"
        name="description"
        value={form.description}
        onChange={handleChange}
      />

      <Input
        label="Product Image"
        type="text"
        name="image"
        value={form.image}
        onChange={handleChange}
      />
      <Typography variant="small" color="gray">
        It has to be "https://url"
      </Typography>

      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          label="Product Rate"
          type="number"
          name="rate"
          value={form.rate}
          onChange={handleChange}
        />

        <Input
          label="Rating Count"
          type="number"
          name="count"
          value={form.count}
          onChange={handleChange}
        />
      </div>

      <div className="text-center">
        <Button onClick={handleAddProduct}>Add Product</Button>
      </div>
    </div>
  );
};

export default AddProducts;
