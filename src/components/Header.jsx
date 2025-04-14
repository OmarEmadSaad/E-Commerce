import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineDarkMode } from "react-icons/md";
import { BsCart4 } from "react-icons/bs";
import { CiLight } from "react-icons/ci";
import AppContext from "./Context/Context";
import Avater from "./pages/auth/Avater";

const NavList = () => {
  const navigate = useNavigate();

  return (
    <ul className="flex flex-col lg:flex-row gap-2 lg:gap-6">
      <li>
        <Typography
          as={Link}
          to="/"
          className="mr-4 cursor-pointer py-1.5 font-medium hover:text-red-500 text-black sm:text-black lg:text-blue-gray-900"
        >
          Home
        </Typography>
      </li>
      <li>
        <Typography
          as={Link}
          to="/products"
          className="mr-4 cursor-pointer py-1.5 font-medium hover:text-red-500 text-black sm:text-black lg:text-blue-gray-900"
        >
          Shop
        </Typography>
      </li>
    </ul>
  );
};

const Header = () => {
  const navigate = useNavigate();

  function setDarkTheme() {
    document.documentElement.classList.add("dark");
    localStorage.theme = "dark";
    setTheme(false);
  }

  function setLightTheme() {
    document.documentElement.classList.remove("dark");
    localStorage.theme = "light";
    setTheme(true);
  }
  const [theme, setTheme] = useState(true);
  const { setIsLoggedIn, isLoggedIn, cartItems } = useContext(AppContext);

  const [openNav, setOpenNav] = useState(false);

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <Navbar className="sticky top-0 z-10 h-max max-w-full bg-gray-100 rounded-none px-4 py-2 lg:px-8 lg:py-4">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography
          as={Link}
          to="/"
          className="mr-4 cursor-pointer py-1.5 font-medium text-red-600 "
        >
          Male Fashion
        </Typography>

        <div className="mr-4 hidden lg:block">
          <NavList />
        </div>

        <div className="flex items-center gap-4 relative">
          <Button color="green" className="relative">
            <Link
              to="/cart"
              className="text-xl relative flex items-center justify-center"
            >
              <BsCart4 />
              <div className="absolute top-[-8px] right-[-8px] flex items-center justify-center w-5 h-5 bg-red-600 text-white text-xs rounded-full">
                {cartItems.length}
              </div>
            </Link>
          </Button>

          {theme ? (
            <Button color="green" className="text-xl" onClick={setDarkTheme}>
              <MdOutlineDarkMode />
            </Button>
          ) : (
            <Button color="green" className="text-xl" onClick={setLightTheme}>
              <CiLight />
            </Button>
          )}

          <div className="hidden lg:block">
            {isLoggedIn ? (
              <Avater />
            ) : (
              <Button
                size="md"
                color="green"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            )}
          </div>
        </div>

        <IconButton
          variant="text"
          className="lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>

      <Collapse open={openNav}>
        <NavList />
        <div className="flex items-center justify-between mt-4 px-2">
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <Avater className=" hidden lg:inline-block" />
            ) : (
              <Button
                color="green"
                size="sm"
                className="inline-block lg:hidden"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </Collapse>
    </Navbar>
  );
};

export default Header;
