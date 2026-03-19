import { prisma } from '../../prismaClient/client.js';

export const getAll = async ({
  patientId,
  doctorId,
  startTime,
  endTime,
  status,
  reason,
  notes,
  page = 1,
  limit = 20,
}) => {
  const where = {};

  if (patientId) where.patientId = Number(patientId);

  if (doctorId) where.doctorId = Number(doctorId);

  if (startTime || endTime) {
    where.startTime = {
      ...(startTime && { gte: new Date(startTime) }),
      ...(endTime && { lte: new Date(endTime) }),
    };
  }

  if (status) where.status = status;

  if (reason) where.reason = { contains: reason, mode: 'insensitive' };

  if (notes) where.notes = { contains: notes, mode: 'insensitive' };

  const appointments = await prisma.appointment.findMany({
    where,
    skip: (page - 1) * limit,
    take: Number(limit),
    orderBy: { startTime: 'asc' },
  });

  return appointments;
};

export const getById = async (id) => {
  return prisma.appointment.findUnique({
    where: { id: Number(id) },
    include: { patient: true, doctor: true, visitNote: true },
  });
};

export const add = async ({
  patientId,
  doctorId,
  startTime,
  endTime,
  status,
  reason,
  notes,
}) => {
  const start = new Date(startTime);
  const end = new Date(endTime);

  if (start >= end) {
    throw new Error('Invalid time range');
  }

  const conflict = await prisma.appointment.findFirst({
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

  const appointment = await prisma.appointment.create({
    data: {
      patientId: Number(patientId),
      doctorId: Number(doctorId),
      startTime: start,
      endTime: end,
      status,
      reason,
      notes,
    },
  });

  return appointment;
};
