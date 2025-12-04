// @ts-nocheck
import React, { useState } from "react";
import axiosClient from "../api/axiosClient";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    try {
      const res = await axiosClient.post("/auth/login", form);
      const token = res.data.access_token;

      localStorage.setItem("access_token", token);

      navigate("/generator");
    } catch (err) {
      setError(err.response?.data?.detail || "Login failed");
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Login</h2>

      {error && <p className="text-red-600 mb-3">{error}</p>}

      <form className="space-y-3" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          className="w-full px-3 py-2 border rounded"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full px-3 py-2 border rounded"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="w-full bg-slate-800 text-white py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
