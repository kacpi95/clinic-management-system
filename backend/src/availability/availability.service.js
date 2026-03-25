import { prisma } from '../../prismaClient/client.js';

export const getAll = async ({
  doctorId,
  date,
  startTime,
  endTime,
  isAvailable,
}) => {
  const where = {};

  if (doctorId) where.doctorId = Number(doctorId);

  if (date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    where.date = {
      gte: startOfDay,
      lte: endOfDay,
    };
  }

  if (startTime || endTime) {
    where.startTime = {
      ...(startTime && { gte: new Date(startTime) }),
      ...(endTime && { lte: new Date(endTime) }),
    };
  }

  if (isAvailable !== undefined) {
    where.isAvailable = isAvailable === 'true';
  }

  return prisma.availability.findMany({
    where,
    orderBy: { startTime: 'asc' },
  });
};
