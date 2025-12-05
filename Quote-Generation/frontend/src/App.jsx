// @ts-nocheck
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";

import QuoteGenerator from "./pages/QuoteGenerator";
import Login from "./pages/Login";
import Register from "./pages/Register";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("access_token");
  return token ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div className="max-w-4xl mx-auto mt-10">
        <Routes>
          <Route path="/" element={<Navigate to="/generator" />} />

          <Route
            path="/generator"
            element={
              <ProtectedRoute>
                <QuoteGenerator />
              </ProtectedRoute>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
