import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";
import { Outlet } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function MainLayout() {
  const { darkMode } = useTheme();

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? "bg-slate-950 text-white"
          : "bg-white text-slate-900"
      }`}
    >
      <Navbar />

      <main className="pt-24">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}