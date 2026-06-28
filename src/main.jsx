import React from "react";
import ReactDOM from "react-dom/client";

import { RouterProvider } from "react-router-dom";

import { Toaster } from "react-hot-toast";

import router from "./routes/Router";

import "./index.css";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

  <AuthProvider>
  <RouterProvider router={router} />
</AuthProvider>

    <Toaster position="top-right" />

  </React.StrictMode>
);