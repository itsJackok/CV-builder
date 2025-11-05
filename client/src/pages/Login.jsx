import React, { useState } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";

export default function Login({ setUser }) {
    const [form, setForm] = useState({ email: "", password: "" });
    const [err, setErr] = useState("");
    const navigate = useNavigate();

    async function submit(e) {
        e.preventDefault();
        setErr("");
        try {
            const me = await api("/api/auth/login", { method: "POST", body: form });
            setUser(me);
            navigate("/create"); // straight to Create
        } catch (e) {
            setErr(e.message || "Login failed");
        }
    }

    return (
        <form onSubmit={submit} className="card max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            {err && <div className="text-red-600 mb-2">{err}</div>}
            <label className="label">Email</label>
            <input
                className="input mb-3"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <label className="label">Password</label>
            <input
                className="input mb-4"
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <button className="btn btn-primary w-full">Login</button>
        </form>
    );
}
