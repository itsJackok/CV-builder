import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Create from "./pages/Create.jsx";
import Update from "./pages/Update.jsx";
import Premium from "./pages/Premium.jsx";
import { api } from "./api";

export default function App() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        api("/api/auth/me").then(setUser).catch(() => { });
    }, []);

    useEffect(() => {
        if (user && (window.location.pathname === "/register" || window.location.pathname === "/login")) {
            navigate("/create");
        }
    }, [user, navigate]);

    return (
        <>
            <Navbar user={user} setUser={setUser} />
            <div className="max-w-6xl mx-auto p-4">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register setUser={setUser} />} />
                    <Route path="/login" element={<Login setUser={setUser} />} />   {/* <-- add */}
                    <Route path="/create" element={<Create user={user} />} />
                    <Route path="/update" element={<Update user={user} />} />
                    <Route path="/premium" element={<Premium />} />
                </Routes>
            </div>
        </>
    );
}
