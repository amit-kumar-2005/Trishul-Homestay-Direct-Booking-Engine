import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // =========================================
  // Wait Until Authentication Is Checked
  // =========================================

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl font-semibold text-slate-800">
            Loading...
          </div>

          <p className="mt-2 text-sm text-slate-500">
            Verifying administrator access
          </p>
        </div>
      </div>
    );
  }

  // =========================================
  // User Is Not Logged In
  // =========================================

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // =========================================
  // Logged In But Not Admin
  // =========================================

  if (user.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  // =========================================
  // Admin Access Granted
  // =========================================

  return children;
};

export default AdminRoute;