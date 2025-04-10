import { Card, Typography, Avatar, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import AppContext from "../../../Context/Context";
import { useContext } from "react";
const TABLE_HEAD = ["UserName", "Role", "Email", "Operators"];
const UserTable = () => {
  const urlUser = import.meta.env.VITE_DB_UER;
  const { setUserData, userData, userInfo, setUserInfo } =
    useContext(AppContext);

  return (
    <div>
      <div className="mt-4 text-4xl items-center text-center ">
        <h1 className="text-center">Users</h1>
        <Button color="green" className="mt-4">
          User Info
        </Button>
      </div>

      <Card className="h-full w-full overflow-auto mt-4">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className={`border-b border-blue-gray-100 bg-blue-gray-50 p-4 ${
                    head === "Action" ? "text-center" : ""
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
            {userData.map(({ name, email, role, id }, index) => {
              const isLast = index === products.length - 1;
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
                      <Avatar src={email} alt="error photo" loading="lazy" />
                    </Typography>
                  </td>

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
                      {role} $
                    </Typography>
                  </td>

                  <td className={classes}>
                    <Typography
                      as="div"
                      className="w-full flex items-center justify-center gap-4"
                    >
                      <Button size="sm" color="blue">
                        <Link to={`/admin/products/${id}`}>View</Link>
                      </Button>
                      <Button size="sm" color="yellow">
                        <Link to={`/admin/products/edit/${id}`}>
                          Make Admin
                        </Link>
                      </Button>
                      {/* <Button
                        size="sm"
                        color="red"
                        onClick={() => delProduct({ title, id })}
                      >
                        Delete
                      </Button> */}
                    </Typography>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default UserTable;
