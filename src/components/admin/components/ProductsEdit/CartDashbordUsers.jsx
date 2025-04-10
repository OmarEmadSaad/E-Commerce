import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CartDashbordUsers = () => {
  const [lastUser, setLastUser] = useState("");
  const [numOfUsers, setNumOfUsers] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const urlUser = import.meta.env.VITE_DB_UER;

    fetch(`${urlUser}`)
      .then((res) => res.json())
      .then((data) => {
        const lastuser = data[data.length - 1].name;
        const numOfuser = data.length;
        setLastUser(lastuser);
        setNumOfUsers(numOfuser);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  return (
    <div>
      <Card
        color="gray"
        variant="gradient"
        className="w-full max-w-[20rem] p-8"
      >
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 mb-8 rounded-none border-b border-white/10 pb-8 text-center"
        >
          <Typography
            variant="h1"
            color="white"
            className="mt-6 flex justify-center gap-1 text-7xl font-normal"
          >
            <span className="mt-2 text-4xl">Users</span>
          </Typography>
        </CardHeader>
        <CardBody className="p-0 flex flex-col gap-5 ">
          <h1>Number Of Users: {numOfUsers}</h1>
          <h1>Last User Login: {lastUser.slice(0, 8)}</h1>
        </CardBody>

        <CardFooter className="mt-12 p-0">
          <Button
            size="lg"
            color="white"
            className="hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
            ripple={false}
            fullWidth={true}
            onClick={() => {
              navigate("/admin/users");
            }}
          >
            Check Products
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CartDashbordUsers;

// import {
//   Card,
//   CardHeader,
//   CardBody,
//   CardFooter,
//   Typography,
//   Button,
// } from "@material-tailwind/react";

// function CheckIcon() {
//   const urlUser = import.meta.env.VITE_DB_UER;
//   const urlProducts = import.meta.env.VITE_DB_PRODUCTS;
//   fetch(`${urlUser}`)
//     .then((res) => res.json())
//     .then((data) => {
//       const lastuser = data[data.length - 1].name;
//       const numOfuser = data.length;
//     });
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       fill="none"
//       viewBox="0 0 24 24"
//       strokeWidth={2}
//       stroke="currentColor"
//       className="h-3 w-3"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         d="M4.5 12.75l6 6 9-13.5"
//       />
//     </svg>
//   );
// }

// const CartDashbord = () => {
//   return (
//     <div>
//       <Card
//         color="gray"
//         variant="gradient"
//         className="w-full max-w-[20rem] p-8"
//       >
//         <CardHeader
//           floated={false}
//           shadow={false}
//           color="transparent"
//           className="m-0 mb-8 rounded-none border-b border-white/10 pb-8 text-center"
//         >
//           <Typography
//             variant="h1"
//             color="white"
//             className="mt-6 flex justify-center gap-1 text-7xl font-normal"
//           >
//             <span className="mt-2 text-4xl">Users</span>
//           </Typography>
//         </CardHeader>
//         <CardBody className="p-0 flex flex-col gap-5">
//           <h1>Number Of Users : </h1>
//           <h1>Last User Login:</h1>
//         </CardBody>

//         <CardFooter className="mt-12 p-0">
//           <Button
//             size="lg"
//             color="white"
//             className="hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
//             ripple={false}
//             fullWidth={true}
//           >
//             Buy Now
//           </Button>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// };

// export default CartDashbord;
