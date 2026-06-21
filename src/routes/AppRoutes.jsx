import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import Rooms from "../pages/Rooms";
import Availability from "../pages/Availability";
import Booking from "../pages/Booking";
import ComponentDemo from "../pages/ComponentDemo";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>

        <Route path="/" element={<Home />} />

        <Route
          path="/rooms"
          element={<Rooms />}
        />

        <Route
          path="/availability"
          element={<Availability />}
        />

        <Route
          path="/booking"
          element={<Booking />}
        />

        <Route
          path="/components"
          element={<ComponentDemo />}
        />

      </Route>
    </Routes>
  );
}