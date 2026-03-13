import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { prisma } from '../../prismaClient/client.js';

const JWT_SECRET = process.env.JWT_SECRET;

function signToken(user) {
  return jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: '7d',
  });
}

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required' });
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
      },
      select: {
        id: true,
        email: true,
        role: true,
      },
    });

    const token = signToken(user);

    return res.status(201).json({ user, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Register failed' });
  }
};
