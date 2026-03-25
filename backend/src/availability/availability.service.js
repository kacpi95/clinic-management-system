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

export const getById = async (id) => {
  return prisma.availability.findUnique({
    where: { id: Number(id) },
    include: { doctor: true },
  });
};

export const add = async ({
  doctorId,
  date,
  startTime,
  endTime,
  isAvailable,
}) => {
  const start = new Date(startTime);
  const end = new Date(endTime);
  const availabilityDate = new Date(date);

  if (start >= end) {
    throw new Error('Invalid time range');
  }

  const conflict = await prisma.availability.findFirst({
    where: {
      doctorId: Number(doctorId),
      AND: [
        {
          startTime: { lt: end },
        },
        {
          endTime: { gt: start },
        },
      ],
    },
  });

  if (conflict) {
    throw new Error('Time slot already taken');
  }

  const newAvailability = await prisma.availability.create({
    data: {
      doctorId: Number(doctorId),
      date: availabilityDate,
      startTime: start,
      endTime: end,
      isAvailable: isAvailable ?? true,
    },
  });

  return newAvailability;
};

export const remove = async (id) => {
  return prisma.availability.delete({
    where: { id: Number(id) },
  });
};

export const update = async (id, data) => {
  const availabilityId = Number(id);

  const existing = await prisma.availability.findUnique({
    where: { id: availabilityId },
  });

  if (!existing) {
    return null;
  }

  const finalStart = data.startTime
    ? new Date(data.startTime)
    : existing.startTime;

  const finalEnd = data.endTime ? new Date(data.endTime) : existing.endTime;

  if (finalStart >= finalEnd) {
    throw new Error('Invalid time range');
  }

  const conflict = await prisma.availability.findFirst({
    where: {
      doctorId: Number(data.doctorId),
      id: { not: availabilityId },
      AND: [{ startTime: { lt: finalEnd } }, { endTime: { gt: finalStart } }],
    },
  });

  if (conflict) {
    throw new Error('Time slot already taken');
  }

  const { doctorId, ...safeData } = data;

  return prisma.availability.update({
    where: { id: availabilityId },
    data: {
      ...safeData,
      startTime: finalStart,
      endTime: finalEnd,
    },
  });
};
