import { prisma } from '../../prismaClient/client.js';

export const getAll = async ({
  patientId,
  appointmentId,
  doctorId,
  diagnosis,
  recommendations,
  medications,
  notes,
  page = 1,
  limit = 20,
}) => {
  const where = {};

  if (patientId) where.patientId = Number(patientId);

  if (appointmentId) where.appointmentId = Number(appointmentId);

  if (doctorId) where.doctorId = Number(doctorId);

  if (diagnosis) where.diagnosis = { contains: diagnosis, mode: 'insensitive' };

  if (recommendations) {
    where.recommendations = { contains: recommendations, mode: 'insensitive' };
  }

  if (medications)
    where.medications = { contains: medications, mode: 'insensitive' };

  if (notes) where.notes = { contains: notes, mode: 'insensitive' };

  const visitNotes = await prisma.visitNote.findMany({
    where,
    skip: (page - 1) * Number(limit),
    take: Number(limit),
    orderBy: { createdAt: 'asc' },
  });

  return visitNotes;
};

export const getById = async (id) => {
  return prisma.visitNote.findFirst({
    where: { id: Number(id) },
    include: { patient: true, doctor: true, appointment: true },
  });
};

export const add = async ({
  patientId,
  appointmentId,
  doctorId,
  diagnosis,
  recommendations,
  medications,
  notes,
}) => {
  const appointment = await prisma.appointment.findFirst({
    where: {
      id: Number(appointmentId),
      doctorId: Number(doctorId),
      patientId: Number(patientId),
    },
  });

  if (!appointment) {
    throw new Error('Appointment not found or access denied');
  }

  const existingVisitNote = await prisma.visitNote.findFirst({
    where: {
      appointmentId: Number(appointmentId),
      doctorId: Number(doctorId),
    },
  });

  if (existingVisitNote) {
    throw new Error('Visit note already exists for this appointment');
  }

  const visitNote = await prisma.visitNote.create({
    data: {
      patientId: Number(patientId),
      appointmentId: Number(appointmentId),
      doctorId: Number(doctorId),
      diagnosis,
      recommendations,
      medications,
      notes,
    },
  });

  return visitNote;
};

export const remove = async (id) => {
  return prisma.visitNote.delete({
    where: { id: Number(id) },
  });
};


