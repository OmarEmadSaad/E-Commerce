import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../../Context/Context";

const Login = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn, setUserInfo, setUserData } = useContext(AppContext);
  const urlUser = import.meta.env.VITE_DB_UER;

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const handleLoginAccount = (e) => {
    e.preventDefault();

    fetch(`${urlUser}`)
      .then((res) => res.json())
      .then((data) => {
        const foundUser = data.find(
          (u) => u.email === user.email && u.password === user.password
        );

        if (foundUser) {
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("userID", foundUser.id);
          localStorage.setItem("userData", JSON.stringify(foundUser));

          setIsLoggedIn(true);
          setUserInfo(foundUser);
          setUserData(foundUser);

          navigate("/products");
        } else {
          setError("Invalid email or password");
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setError("Something went wrong. Please try again.");
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
            Login
          </Typography>
        </CardHeader>
        <form onSubmit={handleLoginAccount}>
          <CardBody className="flex flex-col gap-4">
            <Input
              label="Email"
              size="lg"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <Input
              label="Password"
              size="lg"
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            {error && (
              <Typography color="red" className="text-sm">
                {error}
              </Typography>
            )}
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth type="submit" color="green">
              Login
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Do not have an account?
              <Typography
                as={Link}
                to="/sign-up"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold"
              >
                Sign Up
              </Typography>
            </Typography>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;
