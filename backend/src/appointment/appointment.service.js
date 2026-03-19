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
