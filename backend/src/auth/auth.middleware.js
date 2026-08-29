import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  try {
    console.log('=== AUTH MIDDLEWARE ===');
    console.log('METHOD:', req.method);
    console.log('URL:', req.originalUrl);

    const header = req.headers.authorization;

    console.log('AUTH HEADER EXISTS:', Boolean(header));
    console.log('AUTH HEADER STARTS BEARER:', header?.startsWith('Bearer '));

    if (!header?.startsWith('Bearer ')) {
      return res.status(401).json({
        message: 'Missing token',
      });
    }

    const token = header.split(' ')[1];

    console.log('REQUEST TOKEN EXISTS:', Boolean(token));
    console.log('REQUEST TOKEN LENGTH:', token?.length);
    console.log('REQUEST TOKEN END:', token?.slice(-25));

    console.log('VERIFY SECRET EXISTS:', Boolean(process.env.JWT_SECRET));

    console.log('VERIFY SECRET LENGTH:', process.env.JWT_SECRET?.length);

    const decodedWithoutVerify = jwt.decode(token);

    console.log('DECODED TOKEN:', {
      userId: decodedWithoutVerify?.userId,
      email: decodedWithoutVerify?.email,
      role: decodedWithoutVerify?.role,
      iat: decodedWithoutVerify?.iat,
      exp: decodedWithoutVerify?.exp,
    });

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    console.log('JWT VERIFY: OK');

    req.user = payload;
    next();
  } catch (error) {
    console.error('=== AUTH ERROR ===');
    console.error('ERROR NAME:', error.name);
    console.error('ERROR MESSAGE:', error.message);

    return res.status(401).json({
      message: 'Invalid token',
    });
  }
};
