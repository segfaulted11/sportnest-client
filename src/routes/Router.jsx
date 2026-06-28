import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home/Home";
import AllFacilities from "../pages/AllFacilities/AllFacilities";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import MyBookings from "../pages/MyBookings/MyBookings";
import AddFacility from "../pages/AddFacility/AddFacility";
import ManageFacilities from "../pages/ManageFacilities/ManageFacilities";
import FacilityDetails from "../pages/FacilityDetails/FacilityDetails";
import ErrorPage from "../pages/Error/ErrorPage";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
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
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "/my-bookings",
        element: (
          <PrivateRoute>
            <MyBookings />
          </PrivateRoute>
        ),
      },
      {
        path: "/add-facility",
        element: (
          <PrivateRoute>
            <AddFacility />
          </PrivateRoute>
        ),
      },
      {
        path: "/manage-facilities",
        element: (
          <PrivateRoute>
            <ManageFacilities />
          </PrivateRoute>
        ),
      },
      {
        path: "/facility/:id",
        element: (
          <PrivateRoute>
            <FacilityDetails />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
