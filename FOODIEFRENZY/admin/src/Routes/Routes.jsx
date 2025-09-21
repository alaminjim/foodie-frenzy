import { createBrowserRouter } from "react-router-dom";
import Layouts from "../Layouts/Layouts";
import AddItems from "../Components/addItems";
import List from "../Components/List";
import Orders from "../Components/Orders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layouts></Layouts>,
    children: [
      {
        path: "/",
        element: <AddItems></AddItems>,
      },
      {
        path: "/list",
        element: <List></List>,
      },
      {
        path: "/orders",
        element: <Orders></Orders>,
      },
    ],
  },
]);

export default router;
