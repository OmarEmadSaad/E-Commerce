import { Card, Typography, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { useEffect, useState } from "react";

const TABLE_HEAD = ["UserName", "Role", "Email", "Operators"];

const UserTable = () => {
  const urlUser = import.meta.env.VITE_DB_UER;
  const [users, setUsers] = useState([]);
  const currentUserID = Number(localStorage.getItem("userID"));

  const getUsers = () => {
    const get = { method: "get", url: `${urlUser}` };
    axios(get)
      .then((res) => setUsers(res.data || []))
      .catch((err) => {
        console.error("Error fetching users:", err);
        Swal.fire("Error", "Could not fetch users", "error");
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  const makeAdmin = (id) => {
    axios
      .get(urlUser)
      .then((res) => {
        const users = res.data || [];
        const userIndex = users.findIndex((user) => user.id === id);
        if (userIndex === -1) {
          throw new Error("User not found");
        }

        const updatedUsers = [...users];
        updatedUsers[userIndex] = { ...users[userIndex], role: "admin" };

        return axios.put(urlUser, updatedUsers, {
          headers: { "Content-Type": "application/json" },
        });
      })
      .then(() => {
        getUsers();
        Swal.fire("Updated!", "User is now an Admin", "success");
      })
      .catch((err) => {
        console.error("Error making user admin:", err);
        Swal.fire("Error", "Could not update user", "error");
      });
  };

  const makeUser = (id) => {
    axios
      .get(urlUser)
      .then((res) => {
        const users = res.data || [];
        const userIndex = users.findIndex((user) => user.id === id);
        if (userIndex === -1) {
          throw new Error("User not found");
        }

        const updatedUsers = [...users];
        updatedUsers[userIndex] = { ...users[userIndex], role: "user" };

        return axios.put(urlUser, updatedUsers, {
          headers: { "Content-Type": "application/json" },
        });
      })
      .then(() => {
        getUsers();
        Swal.fire("Updated!", "User is now a regular User", "success");
      })
      .catch((err) => {
        console.error("Error making user regular:", err);
        Swal.fire("Error", "Could not update user", "error");
      });
  };

  return (
    <div>
      <div className="mt-4 text-4xl items-center text-center">
        <h1 className="text-center">Users</h1>
      </div>

      <Card className="h-full w-full overflow-auto mt-4">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className={`border-b border-blue-gray-100 bg-blue-gray-50 p-4 ${
                    head === "Operators" ? "text-center" : ""
                  }`}
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {users.length > 0 ? (
              users
                .filter((user) => user.id !== currentUserID)
                .map(({ name, email, role, id }, index) => {
                  const isLast = index === users.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={name}>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {name.slice(0, 8)}
                        </Typography>
                      </td>

                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {role}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {email}
                        </Typography>
                      </td>

                      <td className={classes}>
                        <Typography
                          as="div"
                          className="w-full flex items-center justify-center gap-4"
                        >
                          <Button size="sm" color="blue">
                            <Link to={`/admin/users/view/${id}`}>View</Link>
                          </Button>

                          {role === "admin" ? (
                            <Button
                              size="sm"
                              color="red"
                              onClick={() => makeUser(id)}
                            >
                              Make User
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              color="yellow"
                              onClick={() => makeAdmin(id)}
                            >
                              Make Admin
                            </Button>
                          )}
                        </Typography>
                      </td>
                    </tr>
                  );
                })
            ) : (
              <tr>
                <td colSpan={4} className="p-4 text-center">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default UserTable;
