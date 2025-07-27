import { useContext, useEffect, useState } from "react";
import {
  Input,
  Button,
  Avatar,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import Swal from "sweetalert2";
import AppContext from "../../Context/Context";

const Profile = () => {
  const { userInfo, setUserInfo } = useContext(AppContext);
  const urlUser = import.meta.env.VITE_DB_UER;

  const [editing, setEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    name: userInfo?.name || "",
    email: userInfo?.email || "",
    password: userInfo?.password || "",
    role: userInfo?.role || "user",
  });

  useEffect(() => {
    setEditedUser({
      name: userInfo?.name || "",
      email: userInfo?.email || "",
      password: userInfo?.password || "",
      role: userInfo?.role || "user",
    });
  }, [userInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const userId = userInfo?.id;

    fetch(urlUser)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch users");
        return res.json();
      })
      .then((users) => {
        const userIndex = users.findIndex((user) => user.id === userId);
        if (userIndex === -1) throw new Error("User not found");

        const updatedUsers = [...users];
        updatedUsers[userIndex] = {
          ...users[userIndex],
          name: editedUser.name,
          email: editedUser.email,
          password: editedUser.password,
          role: editedUser.role,
          cart: Array.isArray(users[userIndex].cart)
            ? users[userIndex].cart
            : [],
        };

        return fetch(urlUser, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUsers),
        });
      })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update");
        return res.json();
      })
      .then((updatedUsers) => {
        const updatedUser = updatedUsers.find((user) => user.id === userId);
        setUserInfo(updatedUser);
        Swal.fire({
          icon: "success",
          title: "Profile updated successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        setEditing(false);
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Failed to update profile",
          text: err.message,
        });
      });
  };

  const handleEdit = () => {
    setEditing(true);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card className="w-96 shadow-lg rounded-xl">
        <CardHeader
          floated={false}
          className="flex flex-col items-center bg-blue-500 text-white p-6 rounded-t-xl"
        >
          <Avatar
            src="https://i.pravatar.cc/150"
            alt="profile"
            size="xxl"
            className="border-4 border-white"
          />
          <h2 className="text-2xl font-semibold mt-3">My Profile</h2>
        </CardHeader>
        <CardBody className="p-6">
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              {editing ? (
                <Input
                  type="text"
                  name="name"
                  value={editedUser.name}
                  onChange={handleChange}
                />
              ) : (
                <p className="text-gray-700">{editedUser.name}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              {editing ? (
                <Input
                  type="email"
                  name="email"
                  value={editedUser.email}
                  onChange={handleChange}
                />
              ) : (
                <p className="text-gray-700">{editedUser.email}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              {editing ? (
                <Input
                  type="password"
                  name="password"
                  value={editedUser.password}
                  onChange={handleChange}
                />
              ) : (
                <p className="text-gray-700">********</p>
              )}
            </div>
          </div>
        </CardBody>
        <CardFooter className="flex justify-center p-4 border-t">
          {editing ? (
            <div className="space-x-4">
              <Button size="sm" onClick={handleSave}>
                Save Changes
              </Button>
              <Button size="sm" onClick={() => setEditing(false)}>
                Cancel
              </Button>
            </div>
          ) : (
            <Button size="sm" onClick={handleEdit}>
              Edit Profile
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default Profile;
