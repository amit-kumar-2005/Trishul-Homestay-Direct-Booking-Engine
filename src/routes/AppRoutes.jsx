import {
  Routes,
  Route,
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

// =========================================
// Pages
// =========================================

import Home from "../pages/Home";
import Rooms from "../pages/Rooms";
import Availability from "../pages/Availability";
import Booking from "../pages/Booking";
import BookingDetails from "../pages/BookingDetails";
import Dashboard from "../pages/Dashboard";
import AdminDashboard from "../pages/AdminDashboard";
import AdminRooms from "../pages/AdminRooms";
import ComponentDemo from "../pages/ComponentDemo";

// =========================================
// Authentication Pages
// =========================================

import Login from "../pages/Login";
import Register from "../pages/Register";
import GoogleCallback from "../pages/GoogleCallback";

// =========================================
// Route Guards
// =========================================

import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";

// =========================================
// Application Routes
// =========================================

export default function AppRoutes() {
  return (
    <Routes>
      {/* =========================================
          Main Layout Routes
      ========================================= */}

      <Route element={<MainLayout />}>

        {/* =======================================
            Home
        ======================================= */}

        <Route
          path="/"
          element={<Home />}
        />

        {/* =======================================
            Rooms
        ======================================= */}

        <Route
          path="/rooms"
          element={<Rooms />}
        />

        {/* =======================================
            Availability
        ======================================= */}

        <Route
          path="/availability"
          element={<Availability />}
        />

        {/* =======================================
            Protected Booking Route
        ======================================= */}

        <Route
          path="/booking"
          element={
            <ProtectedRoute>
              <Booking />
            </ProtectedRoute>
          }
        />

        {/* =======================================
            Protected Booking Details Route
        ======================================= */}

        <Route
          path="/booking/:id"
          element={
            <ProtectedRoute>
              <BookingDetails />
            </ProtectedRoute>
          }
        />

        {/* =======================================
            Protected User Dashboard
        ======================================= */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* =======================================
            Protected Admin Dashboard
        ======================================= */}

        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        {/* =======================================
            Protected Admin Rooms
        ======================================= */}

        <Route
          path="/admin/rooms"
          element={
            <AdminRoute>
              <AdminRooms />
            </AdminRoute>
          }
        />

        {/* =======================================
            Component Demo
        ======================================= */}

        <Route
          path="/components"
          element={<ComponentDemo />}
        />

      </Route>

      {/* =========================================
          Authentication Routes
      ========================================= */}

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/auth/google/callback"
        element={<GoogleCallback />}
      />

    </Routes>
  );
}