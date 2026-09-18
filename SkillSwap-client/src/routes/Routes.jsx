import { createBrowserRouter } from "react-router";
import HowItWorks from "../components/how-it-works/HowItWorks";
import BookingCheckout from "../components/mentor/BookingCheckout";
import MentorDetails from "../components/mentor/MentorDetails";
import DashboardLayout from "../layouts/DashboardLayout";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ExploreSkills from "../pages/public/ExploreSkills";
import Home from "../pages/public/Home";
import Mentors from "../pages/public/Mentors";
import Bookings from "../pages/student/Bookings";
import Root from "../root/Root";
import PrivateRoute from "./PrivateRoute";

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
        path: "mentors/:id",
        element: <MentorDetails></MentorDetails>,
      },
      {
        path: "how-it-works",
        element: <HowItWorks></HowItWorks>,
      },
      {
        path: "explore-skills",
        element: <ExploreSkills></ExploreSkills>,
      },
      {
        path: "book/:id",
        element: (
          <PrivateRoute>
            <BookingCheckout></BookingCheckout>
          </PrivateRoute>
        ),
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
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <MainLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardLayout></DashboardLayout>,
      },
      {
        path: "mybookings",
        element: <Bookings></Bookings>,
      },
    ],
  },
]);

export default router;
