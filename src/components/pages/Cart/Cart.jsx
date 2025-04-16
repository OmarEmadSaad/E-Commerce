import { Card, Typography, Button } from "@material-tailwind/react";
import AppContext from "../../Context/Context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

const Cart = () => {
  const { cartItems, setCartItems } = useContext(AppContext);
  const navigate = useNavigate();
  const urlUser = import.meta.env.VITE_DB_UER;

  const isEmpty = cartItems.length == 0 ? true : false;
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const taxes = subtotal * 0.15;
  const shipping = 0;
  const total = subtotal + taxes + shipping;

  const handleDelete = (id) => {
    const userId = localStorage.getItem("userID");

    fetch(`${urlUser}/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        const deleteProduct = data.cart.filter((item) => item.id != id);

        fetch(`${urlUser}/${userId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cart: deleteProduct }),
        });
        setCartItems(deleteProduct);
      });
  };

  const handleIncrease = (id) => {
    const userId = localStorage.getItem("userID");

    fetch(`${urlUser}/${userId}`)
      .then((res) => res.json())
      .then((user) => {
        const updatedCart = user.cart.map((item) =>
          item.id == id ? { ...item, quantity: item.quantity + 1 } : item
        );

        fetch(`${urlUser}/${userId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cart: updatedCart }),
        });

        setCartItems(updatedCart);
      });
  };

  const handleDecrease = (id) => {
    const userId = localStorage.getItem("userID");

    fetch(`${urlUser}/${userId}`)
      .then((res) => res.json())
      .then((user) => {
        const updatedCart = user.cart.map((item) =>
          item.id === id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );

        fetch(`${urlUser}/${userId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cart: updatedCart }),
        });

        setCartItems(updatedCart);
      });
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start gap-10 p-6">
      <div className="w-full md:w-2/3 text-center">
        <Typography variant="h4" color="red" className="mb-6">
          Shopping Cart
        </Typography>

        {isEmpty ? (
          <div className="text-center mt-20">
            <img
              src="https://mfashionio.vercel.app/assets/img/cart/undraw_empty_cart_co35.svg"
              alt="Empty Cart"
              className="mx-auto w-40 mb-6"
            />
            <Typography variant="h5" className="mb-2 font-semibold">
              Cart's Feeling Light
            </Typography>
            <Typography color="gray" className="mb-4">
              Your cart is longing for some company. Begin your shopping
              adventure now!
            </Typography>
            <Button color="red" onClick={() => navigate("/products")}>
              Explore Our Products
            </Button>
          </div>
        ) : (
          cartItems.map(({ id, title, price, image, quantity }, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b py-4 gap-4 overflow-x-auto flex-nowrap"
            >
              <div className="flex items-center gap-4 min-w-[180px] shrink-0">
                <img
                  src={image}
                  alt="Product"
                  className="w-16 h-16 object-cover"
                />
                <h1 className="font-semibold text-sm md:text-base">
                  {title.slice(0, 10)}
                </h1>
              </div>

              <div className="flex flex-col items-center min-w-[100px] shrink-0">
                <h1 className="text-sm text-gray-500">Price</h1>
                <p className="text-sm mt-1">${parseFloat(price).toFixed(2)}</p>
              </div>

              <div className="flex flex-col items-center min-w-[130px] shrink-0">
                <h1 className="text-sm text-gray-500">Quantity</h1>
                <div className="flex items-center gap-2 mt-1">
                  <button
                    onClick={() => handleDecrease(id)}
                    className="w-8 h-8 border rounded"
                  >
                    -
                  </button>
                  <p className="w-8 text-center">{quantity}</p>
                  <button
                    onClick={() => handleIncrease(id)}
                    className="w-8 h-8 border rounded"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-end gap-4 min-w-[140px] shrink-0">
                <p className="font-semibold whitespace-nowrap">
                  ${(price * quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => handleDelete(id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <MdDelete size={20} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <Card className="w-full md:w-1/3 p-6">
        <Typography variant="h5" className="mb-4">
          Summary
        </Typography>

        <div className="flex justify-between mb-2">
          <Typography>Subtotal</Typography>
          <Typography>${subtotal.toFixed(2)}</Typography>
        </div>
        <div className="flex justify-between mb-2">
          <Typography>Taxes</Typography>
          <Typography>${taxes.toFixed(2)}</Typography>
        </div>
        <div className="flex justify-between mb-2">
          <Typography>Shipping</Typography>
          <Typography>${shipping.toFixed(2)}</Typography>
        </div>
        <hr className="my-4" />
        <div className="flex justify-between font-bold text-lg mb-4">
          <Typography>Total</Typography>
          <Typography>${total.toFixed(2)}</Typography>
        </div>

        <Button
          color="red"
          fullWidth
          onClick={() => {
            const userId = localStorage.getItem("userID");

            if (!userId) {
              navigate("/login");
              return;
            }

            Swal.fire({
              title: "Paid has success",
              text: "Thank you for shopping",
              icon: "success",
              timer: 1500,
              timerProgressBar: true,
              showConfirmButton: false,
            }).then(() => {
              fetch(`${urlUser}/${userId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ cart: [] }),
              });

              setCartItems([]);
              navigate("/products");
            });
          }}
        >
          Checkout
        </Button>
      </Card>
    </div>
  );
};

export default Cart;
