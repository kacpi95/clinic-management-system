import bcrypt from 'bcrypt';

import { prisma } from '../../prismaClient/client.js';

export const updateProfile = async ({
  userId,
  firstName,
  lastName,
  specialization,
  phone,
  email,
}) => {
  return prisma.user.update({
    where: {
      id: Number(userId),
    },

    data: {
      email,
      doctor: {
        update: {
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
};

export const changePassword = async ({
  userId,
  currentPassword,
  newPassword,
}) => {

  const user = await prisma.user.findUnique({
    where: {
      id: Number(userId),
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const isCurrentPasswordValid = await bcrypt.compare(
    currentPassword,
    user.password,
  );

  if (!isCurrentPasswordValid) {
    throw new Error('Invalid current password');
  }

  const isSamePassword = await bcrypt.compare(newPassword, user.password);

  if (isSamePassword) {
    throw new Error('New password must be different');
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: {
      id: Number(userId),
    },

    data: {
      password: hashedPassword,
    },
  });
};
