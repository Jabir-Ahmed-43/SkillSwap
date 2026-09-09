import { createBrowserRouter } from "react-router";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ExploreSkills from "../pages/public/ExploreSkills";
import Home from "../pages/public/Home";
import Mentors from "../pages/public/Mentors";
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
        element: <Mentors></Mentors>,
      },
      {
        path: "how-it-works",
      },
      {
        path: "explore-skills",
        element: <ExploreSkills></ExploreSkills>,
      },
      // {
      //   path: `explore/skills/${params._id}`,
      // },
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
