import { Typography } from "@material-tailwind/react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-white py-5">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <Typography variant="h6" className="mb-3">
            Male-Fashion
          </Typography>
          <Typography variant="small" className="text-gray-400">
            The customer is at the heart of our unique bussiness model, which
            includes design.
          </Typography>
        </div>

        <div>
          <Typography variant="h6" className="mb-3">
            Quick Links
          </Typography>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <h1>Home</h1>
            </li>
            <li>
              <h1>Shop</h1>
            </li>
            <li>
              <h1>About Us</h1>
            </li>
          </ul>
        </div>

        <div>
          <Typography variant="h6" className="mb-3">
            NEWLETTER
          </Typography>
          <h6>
            Be the first to know about new arrivals, look books, sales & promos
          </h6>
        </div>

        <div>
          <Typography variant="h6" className="mb-3">
            Follow Us
          </Typography>
          <div className="flex space-x-4 text-gray-300">
            <a href="#" className="hover:text-white">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-white">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-white">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-white">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
        © Designed by Omar-Emad.
      </div>
    </footer>
  );
};

export default Footer;
