
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import {
  LockKeyhole,
  Mail,
  User,
  ShieldCheck,
  Eye,
  EyeOff,
  ArrowRight,
  KeyRound,
} from "lucide-react";
import { toast } from "react-toastify";

import { useAuth } from "../context/AuthContext";

export default function Auth() {
  const navigate = useNavigate();
  const location = useLocation();

  const { login, register, logout } = useAuth();

  const [activeTab, setActiveTab] = useState(
    location.pathname === "/register" ? "register" : "login"
  );

  const [loginType, setLoginType] = useState("user");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    setActiveTab(
      location.pathname === "/register" ? "register" : "login"
    );
  }, [location.pathname]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);

    if (tab === "register") {
      setLoginType("user");
      navigate("/register");
    } else {
      navigate("/login");
    }

    setFormData({
      name: "",
      email: "",
      password: "",
    });
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    try {
      setLoading(true);

      if (activeTab === "register") {
  await register(formData);

  toast.success(
    "Account created successfully! Please login."
  );

  setFormData({
    name: "",
    email: "",
    password: "",
  });

  navigate("/login", { replace: true });
  return;
}
      const response = await login({
        email: formData.email,
        password: formData.password,
      });

      const loggedInUser = response.data;

      if (!loggedInUser) {
        await logout();
        toast.error("Unable to verify account details.");
        return;
      }

      if (
        loginType === "admin" &&
        loggedInUser.role !== "admin"
      ) {
        await logout();
        toast.error("This account does not have administrator access.");
        return;
      }

      if (
        loginType === "user" &&
        loggedInUser.role === "admin"
      ) {
        await logout();
        toast.error("Please use Admin Login for this account.");
        return;
      }

      toast.success("Login successful!");

      if (loggedInUser.role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        error.message ||
        "Authentication failed."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    const apiUrl = import.meta.env.VITE_API_URL;

    if (!apiUrl) {
      toast.error("API URL is not configured.");
      return;
    }

    window.location.href = `${apiUrl}/auth/google`;
  };

  const handleForgotPassword = () => {
  navigate("/forgot-password");
};

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-slate-100 dark:bg-slate-950 transition-colors duration-300">

      <div className="w-full max-w-md">

        {/* Brand */}

        <div className="text-center mb-7">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            TRISHUL <span className="text-teal-600">HOMESTAY</span>
          </h1>

          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Welcome to your comfortable stay
          </p>
        </div>

        {/* Authentication Card */}

        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8">

          {/* Login / Register Tabs */}

          <div className="grid grid-cols-2 bg-slate-100 dark:bg-slate-800 rounded-xl p-1 mb-6">

            <button
              type="button"
              onClick={() => handleTabChange("login")}
              className={`py-3 rounded-lg font-semibold transition ${
                activeTab === "login"
                  ? "bg-teal-600 text-white shadow"
                  : "text-slate-600 dark:text-slate-300"
              }`}
            >
              Login
            </button>

            <button
              type="button"
              onClick={() => handleTabChange("register")}
              className={`py-3 rounded-lg font-semibold transition ${
                activeTab === "register"
                  ? "bg-teal-600 text-white shadow"
                  : "text-slate-600 dark:text-slate-300"
              }`}
            >
              Register
            </button>

          </div>

          {/* Heading */}

          <div className="text-center mb-6">

            <div className="w-14 h-14 mx-auto rounded-full bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-400 flex items-center justify-center mb-3">

              {activeTab === "register" ? (
                <User size={26} />
              ) : loginType === "admin" ? (
                <ShieldCheck size={26} />
              ) : (
                <LockKeyhole size={26} />
              )}

            </div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              {activeTab === "register"
                ? "Create Account"
                : loginType === "admin"
                ? "Administrator Login"
                : "Welcome Back"}
            </h2>

            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              {activeTab === "register"
                ? "Create your Trishul Homestay account"
                : "Sign in to continue to your account"}
            </p>

          </div>

          {/* User / Admin Selection */}

          {activeTab === "login" && (

            <div className="grid grid-cols-2 gap-3 mb-6">

              <button
                type="button"
                onClick={() => setLoginType("user")}
                className={`flex items-center justify-center gap-2 py-3 rounded-xl border font-medium transition ${
                  loginType === "user"
                    ? "border-teal-600 bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400"
                    : "border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300"
                }`}
              >
                <User size={18} />
                User
              </button>

              <button
                type="button"
                onClick={() => setLoginType("admin")}
                className={`flex items-center justify-center gap-2 py-3 rounded-xl border font-medium transition ${
                  loginType === "admin"
                    ? "border-teal-600 bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400"
                    : "border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300"
                }`}
              >
                <ShieldCheck size={18} />
                Admin
              </button>

            </div>
          )}

          {/* Form */}

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Name */}

            {activeTab === "register" && (

              <div className="relative">

                <User
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-teal-500"
                />

              </div>
            )}

            {/* Email */}

            <div className="relative">

              <Mail
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-teal-500"
              />

            </div>

            {/* Password */}

            <div className="relative">

              <KeyRound
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={activeTab === "register" ? 6 : undefined}
                autoComplete={
                  activeTab === "register"
                    ? "new-password"
                    : "current-password"
                }
                className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-teal-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-teal-600"
              >
                {showPassword ? (
                  <EyeOff size={19} />
                ) : (
                  <Eye size={19} />
                )}
              </button>

            </div>

            {/* Forgot Password */}

            {activeTab === "login" && (

              <div className="text-right">

                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-sm font-medium text-teal-600 hover:text-teal-700 dark:text-teal-400"
                >
                  Forgot Password?
                </button>

              </div>
            )}

            {/* Submit */}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl transition shadow-md"
            >
              {loading
                ? "Please wait..."
                : activeTab === "register"
                ? "Create Account"
                : "Sign In"}

              {!loading && <ArrowRight size={19} />}
            </button>

          </form>

          {/* Google Login */}

          {activeTab === "login" && loginType === "user" && (

            <>
              <div className="flex items-center gap-4 my-6">

                <div className="flex-1 border-t border-slate-200 dark:border-slate-700" />

                <span className="text-sm text-slate-400">
                  OR
                </span>

                <div className="flex-1 border-t border-slate-200 dark:border-slate-700" />

              </div>

              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 border border-slate-300 dark:border-slate-700 rounded-xl py-3 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-white transition"
              >
                <FcGoogle size={23} />
                <span className="font-medium">
                  Continue with Google
                </span>
              </button>
            </>
          )}

          {/* Footer */}

          <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-7">

            {activeTab === "register"
              ? "Already have an account?"
              : "Don't have an account?"}

            <button
              type="button"
              onClick={() =>
                handleTabChange(
                  activeTab === "register" ? "login" : "register"
                )
              }
              className="ml-2 font-semibold text-teal-600 hover:text-teal-700 dark:text-teal-400"
            >
              {activeTab === "register" ? "Login" : "Register"}
            </button>

          </p>

        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          © 2026 Trishul Homestay. All rights reserved.
        </p>

      </div>
    </div>
  );
}
