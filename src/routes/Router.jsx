import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AllFacilities from "../pages/AllFacilities";
import FacilityDetails from "../pages/FacilityDetails";
import AddFacility from "../pages/AddFacility";
import ManageFacilities from "../pages/ManageFacilities";
import MyBookings from "../pages/MyBookings";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "facilities",
        element: <AllFacilities />,
      },
      {
        path: "facility/:id",
        element: <FacilityDetails />,
      },
      {
        path: "add-facility",
        element: <AddFacility />,
      },
      {
        path: "manage-facilities",
        element: <ManageFacilities />,
      },
      {
        path: "my-bookings",
        element: <MyBookings />,
      },
    ],
  },
]);

export default router;