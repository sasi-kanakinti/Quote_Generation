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
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-semibold text-slate-800">
          Quote Generator
        </Link>

        <div className="flex gap-4 items-center">
          {!token ? (
            <>
              <Link className="text-sm" to="/login">Login</Link>
              <Link className="px-3 py-1 border rounded text-sm" to="/register">
                Register
              </Link>
            </>
          ) : (
            <>
              <Link className="text-sm" to="/generator">Generator</Link>
              <button
                className="px-3 py-1 border rounded text-sm"
                onClick={logout}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
