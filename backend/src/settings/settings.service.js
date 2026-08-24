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
