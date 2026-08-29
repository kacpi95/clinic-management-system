import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { prisma } from '../../prismaClient/client.js';

const JWT_SECRET = process.env.JWT_SECRET;

console.log('=== JWT STARTUP CHECK ===');
console.log('JWT_SECRET EXISTS:', Boolean(JWT_SECRET));
console.log('JWT_SECRET LENGTH:', JWT_SECRET?.length);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', process.env.PORT);

function signToken(user) {
  console.log('=== SIGN TOKEN ===');
  console.log('SIGN USER ID:', user.id);
  console.log('SIGN USER EMAIL:', user.email);
  console.log('SIGN USER ROLE:', user.role);

  console.log('SIGN SECRET EXISTS:', Boolean(JWT_SECRET));
  console.log('SIGN SECRET LENGTH:', JWT_SECRET?.length);

  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    {
      expiresIn: '7d',
    },
  );

  console.log('SIGNED TOKEN LENGTH:', token.length);
  console.log('SIGNED TOKEN END:', token.slice(-25));

  try {
    const testPayload = jwt.verify(token, JWT_SECRET);

    console.log('SIGN SELF VERIFY: OK');
    console.log('SIGN SELF VERIFY PAYLOAD:', {
      userId: testPayload.userId,
      email: testPayload.email,
      role: testPayload.role,
      iat: testPayload.iat,
      exp: testPayload.exp,
    });
  } catch (error) {
    console.error('SIGN SELF VERIFY ERROR:', error.message);
  }

  return token;
}

export const register = async (req, res) => {
  try {
    const { email, password, firstName, lastName, specialization, phone } =
      req.body;

    if (
      !email ||
      !password ||
      !firstName ||
      !lastName ||
      !specialization ||
      !phone
    ) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: 'The password must have at least 6 characters' });
    }

    const existing = await prisma.user.findUnique({
      where: { email },
    });

    if (existing) {
      return res.status(400).json({ message: 'Email already used' });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashed,
        role: 'DOCTOR',
        doctor: {
          create: {
            firstName,
            lastName,
            specialization,
            phone,
          },
        },
      },
      include: {
        doctor: true,
      },
    });

    const token = signToken(user);

    return res.status(201).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        doctor: user.doctor,
      },
    });
  } catch (error) {
    console.error('REGISTER ERROR:', error);
    return res.status(500).json({
      message: error.message || 'Register failed',
    });
  }
};

export const login = async (req, res) => {
  try {
    console.log('=== LOGIN REQUEST ===');
    console.log('LOGIN EMAIL:', req.body?.email);

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password required',
      });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: { doctor: true },
    });

    console.log('LOGIN USER FOUND:', Boolean(user));

    if (!user) {
      return res.status(401).json({
        message: 'Invalid credentials',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    console.log('LOGIN PASSWORD MATCH:', isMatch);

    if (!isMatch) {
      return res.status(401).json({
        message: 'Invalid credentials',
      });
    }

    const token = signToken(user);

    console.log('LOGIN RETURNING TOKEN END:', token.slice(-25));

    return res.json({
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        doctor: user.doctor,
      },
      token,
    });
  } catch (error) {
    console.error('LOGIN ERROR:', error);
    return res.status(500).json({
      message: 'Login failed',
    });
  }
};

export const me = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(req.user.userId),
      },
      include: {
        doctor: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    return res.json({
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        doctor: user.doctor,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Failed to load user',
    });
  }
};
