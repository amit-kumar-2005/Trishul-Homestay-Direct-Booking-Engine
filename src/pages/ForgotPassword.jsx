
import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft, Send, CheckCircle } from "lucide-react";
import { toast } from "react-toastify";
import { forgotPassword } from "../services/authService";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      toast.error("Please enter your email address.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(normalizedEmail)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);

      const response = await forgotPassword(normalizedEmail);

      if (response.success) {
        setSubmitted(true);
        toast.success("Password reset instructions have been sent.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Unable to send reset link. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-4 py-12">

      <div className="w-full max-w-md">

        {/* Back to Login */}
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 mb-8 transition-colors"
        >
          <ArrowLeft size={17} />
          Back to Login
        </Link>

        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-7 sm:p-9">

          {/* Brand */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center">
              {submitted ? (
                <CheckCircle
                  size={30}
                  className="text-green-600 dark:text-green-400"
                />
              ) : (
                <Mail
                  size={30}
                  className="text-blue-600 dark:text-blue-400"
                />
              )}
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-8">

            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3">
              {submitted ? "Check Your Email" : "Forgot Password?"}
            </h1>

            <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
              {submitted
                ? "If an account exists with this email, password reset instructions will be sent. Please check your inbox and spam folder."
                : "Don't worry! Enter your registered email address and we'll send you a secure password reset link."}
            </p>

          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
                >
                  Email Address
                </label>

                <div className="relative">

                  <Mail
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your registered email"
                    autoComplete="email"
                    required
                    disabled={loading}
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all disabled:opacity-60"
                  />

                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg shadow-blue-600/20 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >

                {loading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Reset Link
                  </>
                )}

              </button>

            </form>
          ) : (
            <div className="space-y-5">

              <div className="rounded-xl bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 p-4 text-center">

                <p className="text-sm font-medium text-green-800 dark:text-green-300">
                  Please check your email for the password reset instructions.
                </p>

              </div>

              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setEmail("");
                }}
                className="w-full py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                Try Another Email
              </button>

            </div>
          )}

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 text-center">

            <p className="text-sm text-slate-500 dark:text-slate-400">
              Remember your password?{" "}
              <Link
                to="/login"
                className="font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                Login
              </Link>
            </p>

          </div>

        </div>

        <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-6">
          © {new Date().getFullYear()} Trishul Homestay. All rights reserved.
        </p>

      </div>

    </div>
  );
}
