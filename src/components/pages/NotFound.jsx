import React from "react";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-6 bg-white dark:bg-gray-900 p-4">
      <img
        src="https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?semt=ais_hybrid&w=740"
        alt="404 Not Found"
        className="w-64 h-64 object-contain"
      />
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
        this page is not found
      </h1>
      <Link to="/">
        <Button color="blue" size="lg">
          Back Home
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
