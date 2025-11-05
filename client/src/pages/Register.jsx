import React from "react";
import { useState } from 'react';
import { api } from '../api';

export default function Register({ setUser }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  async function submit(e) {
    e.preventDefault();
    try {
      const user = await api('/api/auth/register', { method: 'POST', body: form });
      setUser(user); // App redirects to /create
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form onSubmit={submit} className="card max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create your account</h2>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <label className="label">Full name</label>
      <input className="input mb-3" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
      <label className="label">Email</label>
      <input className="input mb-3" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
      <label className="label">Password</label>
      <input className="input mb-4" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
      <button className="btn btn-primary w-full">Register</button>
    </form>
  );
}
