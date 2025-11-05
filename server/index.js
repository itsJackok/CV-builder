import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from './models/User.js';
import Cv from './models/Cv.js';
import { requireAuth } from './middleware/auth.js';

const app = express();

app.use(helmet());
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_ORIGIN,
  credentials: true
}));

await mongoose.connect(process.env.MONGO_URI);

function setAuthCookie(res, payload) {
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.cookie('token', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.COOKIE_SECURE === 'true',
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
}

// Auth
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });
  const existing = await User.findOne({ email });
  if (existing) return res.status(409).json({ message: 'Email already registered' });
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, passwordHash });
  setAuthCookie(res, { id: user._id.toString(), email });
  res.json({ id: user._id, name: user.name, email: user.email });
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
  setAuthCookie(res, { id: user._id.toString(), email });
  res.json({ id: user._id, name: user.name, email: user.email });
});

app.post('/api/auth/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ ok: true });
});

app.get('/api/auth/me', requireAuth, async (req, res) => {
  const user = await User.findById(req.user.id).lean();
  res.json({ id: user._id, name: user.name, email: user.email });
});

// CV CRUD
app.post('/api/cv', requireAuth, async (req, res) => {
  const cv = await Cv.create({ ...req.body, userId: req.user.id });
  res.json(cv);
});

app.get('/api/cv/mine', requireAuth, async (req, res) => {
  const cv = await Cv.findOne({ userId: req.user.id }).lean();
  res.json(cv);
});

app.put('/api/cv/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  const updated = await Cv.findOneAndUpdate({ _id: id, userId: req.user.id }, req.body, { new: true });
  res.json(updated);
});

app.listen(process.env.PORT, () => console.log(`API on :${process.env.PORT}`));
