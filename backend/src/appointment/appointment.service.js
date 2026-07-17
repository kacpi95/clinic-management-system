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

export const remove = async (id) => {
  return prisma.appointment.delete({
    where: { id: Number(id) },
  });
};

export const update = async (id, data) => {
  const appointmentId = Number(id);

  const start = data.startTime ? new Date(data.startTime) : undefined;
  const end = data.endTime ? new Date(data.endTime) : undefined;

  if (start && end && start >= end) {
    throw new Error('Invalid time range');
  }

  if (start || end) {
    const conflict = await prisma.appointment.findFirst({
      where: {
        doctorId: Number(data.doctorId),
        id: { not: appointmentId },
        AND: [
          {
            startTime: { lt: end || new Date('2100-12-31') },
          },
          {
            endTime: { gt: start || new Date('1970-01-01') },
          },
        ],
      },
    });

    if (conflict) {
      throw new Error('Time slot already taken');
    }
  }

  return prisma.appointment.update({
    where: { id: appointmentId },
    data: {
      ...data,
      ...(start && { startTime: start }),
      ...(end && { endTime: end }),
    },
  });
};

export const getCalendarAppointments = async ({ doctorId }) => {
  return prisma.appointment.findMany({
    where: {
      doctorId: Number(doctorId),
    },
    orderBy: {
      startTime: 'asc',
    },
    include: {
      patient: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  });
};
