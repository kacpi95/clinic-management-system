import { prisma } from '../../prismaClient/client.js';

export const getAll = async ({
  firstName,
  lastName,
  pesel,
  birthDate,
  phone,
  email,
  address,
  page = 1,
  limit = 20,
}) => {
  const where = {};

  if (firstName) where.firstName = { contains: firstName, mode: 'insensitive' };

  if (lastName) where.lastName = { contains: lastName, mode: 'insensitive' };

  if (pesel) where.pesel = pesel;

  if (birthDate) where.birthDate = new Date(birthDate);

  if (phone) where.phone = { contains: phone, mode: 'insensitive' };

  if (email) where.email = { contains: email, mode: 'insensitive' };

  if (address) where.address = { contains: address, mode: 'insensitive' };

  const patients = await prisma.patient.findMany({
    where,
    skip: (page - 1) * limit,
    take: Number(limit),
    orderBy: { createdAt: 'desc' },
  });

  return patients;
};

export const getById = async ({ id }) => {
  return prisma.patient.findUnique({
    where: { id: Number(id) },
  });
};

export const add = async ({
  firstName,
  lastName,
  pesel,
  birthDate,
  phone,
  email,
  address,
}) => {
  const newPatient = await prisma.patient.create({
    data: {
      firstName,
      lastName,
      pesel,
      birthDate: new Date(birthDate),
      phone,
      email,
      address,
    },
  });

  return newPatient;
};
