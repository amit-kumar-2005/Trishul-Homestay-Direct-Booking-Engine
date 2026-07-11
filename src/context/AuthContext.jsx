import { createContext, useContext, useEffect, useState } from "react";
import * as authService from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  // =========================
  // Check Logged In User
  // =========================

  useEffect(() => {
    const checkUser = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setLoading(false);
          return;
        }

        const response = await authService.getCurrentUser();

        setUser(response.data);
      } catch (error) {
        console.log(error);

        localStorage.removeItem("token");
      }

      setLoading(false);
    };

    checkUser();
  }, []);

  // =========================
  // Login
  // =========================

  const login = async (credentials) => {
    const response = await authService.login(credentials);

    localStorage.setItem("token", response.token);

    setUser(response.data);

    return response;
  };

  // =========================
  // Register
  // =========================

  const register = async (userData) => {
    const response = await authService.register(userData);

    localStorage.setItem("token", response.token);

    setUser(response.data);

    return response;
  };

  // =========================
  // Logout
  // =========================

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.log(error);
    }

    localStorage.removeItem("token");

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);