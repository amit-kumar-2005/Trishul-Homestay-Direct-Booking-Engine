import { useEffect } from "react";

export default function GoogleCallback() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const token = params.get("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    // Save JWT Token
    localStorage.setItem("token", token);

    // Reload React App so AuthContext runs again
    window.location.href = "/";
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-2xl font-bold">
        Google Login Processing...
      </h1>
    </div>
  );
}