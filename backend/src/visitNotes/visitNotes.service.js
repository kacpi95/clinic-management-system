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
