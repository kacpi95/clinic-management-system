import { prisma } from '../../prismaClient/client.js';

const getDoctorByUserId = async (userId) => {
  const doctor = await prisma.doctor.findUnique({
    where: {
      userId: Number(userId),
    },
  });

  if (!doctor) {
    throw new Error('Doctor not found');
  }

  return doctor;
};

export const getAll = async ({
  userId,
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
  const doctor = await getDoctorByUserId(userId);

  const where = {
    doctorId: doctor.id,
  };

  if (firstName) where.firstName = { contains: firstName };
  if (lastName) where.lastName = { contains: lastName };
  if (pesel) where.pesel = pesel;
  if (birthDate) where.birthDate = new Date(birthDate);
  if (phone) where.phone = { contains: phone };
  if (email) where.email = { contains: email };
  if (address) where.address = { contains: address };

  return prisma.patient.findMany({
    where,
    skip: (page - 1) * limit,
    take: Number(limit),
    orderBy: {
      createdAt: 'desc',
    },
  });
};

export const getById = async (id, userId) => {
  const doctor = await getDoctorByUserId(userId);

  return prisma.patient.findFirst({
    where: {
      id: Number(id),
      doctorId: doctor.id,
    },

    include: {
      appointments: {
        orderBy: {
          startTime: 'desc',
        },

        include: {
          doctor: true,
        },
      },

      visitNotes: {
        orderBy: {
          createdAt: 'desc',
        },

        include: {
          doctor: true,
          appointment: true,
        },
      },
    },
  });
};

export const add = async ({
  userId,
  firstName,
  lastName,
  pesel,
  birthDate,
  phone,
  email,
  address,
}) => {
  const doctor = await getDoctorByUserId(userId);

  return prisma.patient.create({
    data: {
      doctorId: doctor.id,
      firstName,
      lastName,
      pesel,
      birthDate: new Date(birthDate),
      phone,
      email,
      address,
    },
  });
};

export const remove = async (id, userId) => {
  const doctor = await getDoctorByUserId(userId);

  const patient = await prisma.patient.findFirst({
    where: {
      id: Number(id),
      doctorId: doctor.id,
    },
  });

  if (!patient) {
    throw new Error('Patient not found');
  }

  return prisma.patient.delete({
    where: {
      id: patient.id,
    },
  });
};

export const update = async (id, userId, data) => {
  const doctor = await getDoctorByUserId(userId);

  const patient = await prisma.patient.findFirst({
    where: {
      id: Number(id),
      doctorId: doctor.id,
    },
  });

  if (!patient) {
    throw new Error('Patient not found');
  }

  return prisma.patient.update({
    where: {
      id: patient.id,
    },
    data: {
      ...data,
      ...(data.birthDate && {
        birthDate: new Date(data.birthDate),
      }),
    },
  });
};
