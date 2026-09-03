import { createBrowserRouter } from "react-router";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Home from "../pages/public/Home";
import Root from "../root/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "find-mentors",
      },
      {
        path: "how-it-works",
      },
      {
        path: "explore-skills",
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
    ],
  },
]);

export default router;
