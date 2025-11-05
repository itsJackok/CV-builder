import jwt from 'jsonwebtoken';

export function requireAuth(req, res, next) {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload; // { id, email }
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
}
