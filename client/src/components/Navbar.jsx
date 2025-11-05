import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api";

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();
  async function logout() {
    await api("/api/auth/logout", { method: "POST" });
    setUser(null);
    navigate("/");
  }
  return (
    <nav className="bg-white border-b sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-bold text-xl">CV Builder</Link>
        <div className="flex items-center gap-6">
          <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link" to="/create">Create</Link>
          <Link className="nav-link" to="/update">Update</Link>
          <Link className="nav-link" to="/premium">Join Premium</Link>
          {user ? (
            <button onClick={logout} className="btn btn-ghost">Logout</button>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="btn btn-primary">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
