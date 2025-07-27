import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
} from "@material-tailwind/react";
import { Link, useParams } from "react-router-dom";

const UserProfile = () => {
  const urlUser = import.meta.env.VITE_DB_UER;
  const { id } = useParams();

  const [user, setUser] = useState({ name: "", email: "", role: "" });

  useEffect(() => {
    fetch(urlUser)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch users");
        return res.json();
      })
      .then((data) => {
        const foundUser = data.find((user) => user.id === Number(id));
        if (foundUser) {
          setUser({
            name: foundUser.name,
            email: foundUser.email,
            role: foundUser.role,
          });
        } else {
          console.error("User not found");
        }
      })
      .catch((error) => console.error("Error fetching user:", error));
  }, [id, urlUser]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card className="w-96 shadow-lg rounded-xl">
        <CardHeader
          floated={false}
          className="flex flex-col items-center bg-blue-500 text-white p-6 rounded-t-xl"
        >
          <Avatar
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb51ZwKCKqU4ZrB9cfaUNclbeRiC-V-KZsfQ&s"
            alt="profile"
            size="xxl"
            className="border-4 border-white"
          />
          <h2 className="text-2xl font-semibold mt-3">
            {user.name || "Guest User"}
          </h2>
        </CardHeader>
        <CardBody className="p-6">
          <div className="space-y-3">
            <p className="text-gray-700">
              <strong>Email:</strong> {user.email || "No email available"}
            </p>
            <p className="text-gray-700">
              <strong>Role:</strong> {user.role || "User"}
            </p>
          </div>
        </CardBody>
        <CardFooter className="flex justify-center p-4 border-t">
          <Button size="sm">
            <Link to="/admin/users">Back Users</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UserProfile;
