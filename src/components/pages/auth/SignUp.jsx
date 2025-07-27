import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const SignUp = () => {
  const urlUser = import.meta.env.VITE_DB_UER;
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    cart: [],
  });
  const [errors, setErrors] = useState({ name: "", email: "", password: "" });
  const [emailExists, setEmailExists] = useState(false);

  const validate = () => {
    let isValid = true;
    let newErrors = { name: "", email: "", password: "" };

    if (!/^[a-zA-Z0-9]{3,15}$/.test(user.name)) {
      newErrors.name =
        "Username must be between 3 and 15 characters long and contain only letters and numbers.";
      isValid = false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
      newErrors.email = "Invalid email.";
      isValid = false;
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(user.password)) {
      newErrors.password =
        "The password must be at least 8 characters long and contain an uppercase and lowercase letter and a number.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const checkEmailFound = (email) => {
    fetch(urlUser)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch users");
        return res.json();
      })
      .then((data) => {
        const foundUser = data.find((u) => u.email === email);
        setEmailExists(!!foundUser);
      })
      .catch((error) => console.error("Error checking email:", error));
  };

  const handleCreateAccount = (e) => {
    e.preventDefault();
    if (!validate()) return;

    fetch(urlUser)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch users");
        return res.json();
      })
      .then((users) => {
        if (users.find((u) => u.email === user.email)) {
          setErrors((prev) => ({
            ...prev,
            email: "This email is already registered.",
          }));
          return;
        }

        const maxId =
          users.length > 0 ? Math.max(...users.map((u) => u.id)) : 0;
        const newUser = {
          ...user,
          id: maxId + 1,
          role: user.email === "omar@gamil.com" ? "admin" : "user",
          cart: user.email === "omar@gamil.com" ? '"' : [],
        };

        const updatedUsers = [...users, newUser];

        return fetch(urlUser, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUsers),
        });
      })
      .then((response) => {
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error registering user:", error);
        setErrors((prev) => ({
          ...prev,
          email: "Failed to register user. Please try again.",
        }));
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-96">
        <CardHeader
          variant="gradient"
          color="green"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Sign Up
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Input
            label="Name"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
          {errors.name && <Typography color="red">{errors.name}</Typography>}

          <Input
            label="Email"
            value={user.email}
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
              checkEmailFound(e.target.value);
            }}
          />
          {errors.email && <Typography color="red">{errors.email}</Typography>}
          {emailExists && (
            <Typography color="red">
              This email is already registered.
            </Typography>
          )}

          <Input
            label="Password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          {errors.password && (
            <Typography color="red">{errors.password}</Typography>
          )}
        </CardBody>
        <CardFooter className="pt-0">
          <Button
            variant="gradient"
            color="green"
            fullWidth
            onClick={handleCreateAccount}
          >
            Sign Up
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
            Already have an account?
            <Typography
              as={Link}
              to="/login"
              variant="small"
              color="blue"
              className="ml-1 font-bold"
            >
              Login
            </Typography>
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUp;
