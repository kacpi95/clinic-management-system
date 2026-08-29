import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header?.startsWith('Bearer '))
      return res.status(401).json({ message: 'Missing token' });

    const token = header.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = payload;
    next();
  } catch (error) {
    console.error('AUTH ERROR:', error.message);

    return res.status(401).json({
      message: 'Invalid token',
    });
  }
};
