import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { prisma } from '../../prismaClient/client.js';

const JWT_SECRET = process.env.JWT_SECRET;

function signToken(user) {
  return jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    {
      expiresIn: '7d',
    },
  );
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
        firstName: user.doctor.firstName,
        lastName: user.doctor.lastName,
        specialization: user.doctor.specialization,
        phone: user.doctor.phone,
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
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = signToken(user);

    return res.json({
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Login failed' });
  }
};

export const me = async (req, res) => {
  res.json({ user: req.user });
};
