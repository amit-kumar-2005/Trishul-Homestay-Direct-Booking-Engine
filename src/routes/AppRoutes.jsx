import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import Rooms from "../pages/Rooms";
import Availability from "../pages/Availability";
import Booking from "../pages/Booking";
import ComponentDemo from "../pages/ComponentDemo";

import Login from "../pages/Login";
import Register from "../pages/Register";
import GoogleCallback from "../pages/GoogleCallback";

import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  console.log("AppRoutes Rendered");

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />

        <Route path="/rooms" element={<Rooms />} />

        <Route
          path="/availability"
          element={<Availability />}
        />

        <Route
          path="/booking"
          element={
            <ProtectedRoute>
              <Booking />
            </ProtectedRoute>
          }
        />

        <Route
          path="/components"
          element={<ComponentDemo />}
        />
      </Route>

      {/* Authentication */}

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      {/* Google OAuth Callback */}

      <Route
        path="/auth/google/callback"
        element={<GoogleCallback />}
      />
    </Routes>
  );
}