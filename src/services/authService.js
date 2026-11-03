
import api from "./api";

// =======================
// Register
// =======================

export const register = async (userData) => {
  const response = await api.post("/auth/register", userData);

  return response.data;
};

// =======================
// Login
// =======================

export const login = async (userData) => {
  const response = await api.post("/auth/login", userData);

  return response.data;
};

// =======================
// Logout
// =======================

export const logout = async () => {
  const response = await api.post("/auth/logout");

  return response.data;
};

// =======================
// Current User
// =======================

export const getCurrentUser = async () => {
  const response = await api.get("/auth/me");

  return response.data;
};

// =======================
// Forgot Password
// POST /api/auth/forgot-password
// =======================

export const forgotPassword = async (email) => {
  const response = await api.post("/auth/forgot-password", {
    email,
  });

  return response.data;
};

// =======================
// Reset Password
// POST /api/auth/reset-password/:token
// =======================

export const resetPassword = async (token, password) => {
  const response = await api.post(
    `/auth/reset-password/${encodeURIComponent(token)}`,
    {
      password,
    }
  );

  return response.data;
};
