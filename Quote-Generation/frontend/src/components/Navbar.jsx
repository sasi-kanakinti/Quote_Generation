// @ts-nocheck
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  function logout() {
    localStorage.removeItem("access_token");
    navigate("/login");
  }

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white shadow">
      <Link to="/" className="text-xl font-semibold">
        Quote Generator
      </Link>

      <div className="flex gap-3">
        {!token && (
          <>
            <Link
              to="/login"
              className="px-3 py-1 border rounded hover:bg-gray-100"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="px-3 py-1 border rounded hover:bg-gray-100"
            >
              Register
            </Link>
          </>
        )}

        {token && (
          <button
            onClick={logout}
            className="px-3 py-1 border rounded hover:bg-gray-100"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
