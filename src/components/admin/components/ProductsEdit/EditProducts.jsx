import { useContext, useEffect, useState } from "react";
import AppContext from "../../../Context/Context";
import { Input, Textarea, Button, Typography } from "@material-tailwind/react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const EditProducts = () => {
  const urlProducts = import.meta.env.VITE_DB_PRODUCTS;
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, getProducts } = useContext(AppContext);

  const product = products.find((p) => p.id == id);

  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    image: "",
    rate: "",
    count: "",
  });

  useEffect(() => {
    if (product) {
      setForm({
        title: product.title,
        price: product.price,
        category: product.category,
        description: product.description,
        image: product.image,
        rate: product.rating.rate,
        count: product.rating.count,
      });
    }
  }, [product]);

  const handleEdit = () => {
    fetch(urlProducts)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((productsData) => {
        const productIndex = productsData.findIndex((p) => p.id == id);
        if (productIndex === -1) throw new Error("Product not found");

        const updatedProducts = [...productsData];
        updatedProducts[productIndex] = {
          ...updatedProducts[productIndex],
          title: form.title,
          price: Number(form.price),
          category: form.category,
          description: form.description,
          image: form.image,
          rating: {
            rate: Number(form.rate),
            count: Number(form.count),
          },
        };

        return fetch(urlProducts, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProducts),
        });
      })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update");
        return res.json();
      })
      .then(() => {
        getProducts();
        Swal.fire({
          icon: "success",
          title: "Product updated successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          navigate("/admin/products");
        }, 1600);
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Failed to update product",
          text: err.message,
        });
      });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg flex flex-col gap-4">
      <Typography variant="h5" color="blue-gray" className="text-center">
        Edit Product
      </Typography>

      <Input
        label="Product Title"
        type="text"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          label="Product Price"
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <Input label="Currency" value="$" readOnly className="w-full" />
      </div>

      <Input
        label="Product Category"
        type="text"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      />

      <Textarea
        label="Product Description"
        type="text"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <Input
        label="Product Image"
        type="text"
        value={form.image}
        onChange={(e) => setForm({ ...form, image: e.target.value })}
      />
      <Typography variant="small" color="gray">
        It have to be "https://url"
      </Typography>

      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          label="Product Rate"
          type="number"
          value={form.rate}
          onChange={(e) => setForm({ ...form, rate: e.target.value })}
        />

        <Input
          label="Rating Count"
          type="number"
          value={form.count}
          onChange={(e) => setForm({ ...form, count: e.target.value })}
        />
      </div>

      <div className="text-center">
        <Button onClick={handleEdit}>Edit Product</Button>
      </div>
    </div>
  );
};

export default EditProducts;
