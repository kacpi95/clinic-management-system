import { prisma } from '../prismaClient/client.js';
import bcrypt from 'bcrypt';

async function main() {
  await prisma.visitNote.deleteMany();
  await prisma.appointment.deleteMany();
  await prisma.availability.deleteMany();
  await prisma.doctor.deleteMany();
  await prisma.patient.deleteMany();
  await prisma.user.deleteMany();

  const password = await bcrypt.hash('123456', 10);

  await prisma.user.createMany({
    data: [
      {
        id: 1,
        email: 'doctor1@clinic.pl',
        password,
        role: 'DOCTOR',
      },
      {
        id: 2,
        email: 'doctor2@clinic.pl',
        password,
        role: 'DOCTOR',
      },
      {
        id: 3,
        email: 'admin@clinic.pl',
        password,
        role: 'ADMIN',
      },
    ],
  });

  await prisma.doctor.createMany({
    data: [
      {
        id: 1,
        userId: 1,
        firstName: 'Kacper',
        lastName: 'Nowak',
        specialization: 'Chirurg',
        phone: '111111111',
      },
      {
        id: 2,
        userId: 2,
        firstName: 'Dawid',
        lastName: 'Korona',
        specialization: 'Ortopeda',
        phone: '222222222',
      },
    ],
  });

  await prisma.patient.createMany({
    data: [
      {
        id: 1,
        firstName: 'Kamil',
        lastName: 'Nowakowski',
        pesel: '99010112345',
        birthDate: new Date('1999-01-01'),
        phone: '999999999',
        email: 'kamil@gmail.com',
        address: 'ul. Orla 1, Kraków',
      },
      {
        id: 2,
        firstName: 'Anna',
        lastName: 'Kowalska',
        pesel: '95051254321',
        birthDate: new Date('1995-05-12'),
        phone: '888777666',
        email: 'anna@gmail.com',
        address: 'ul. Leśna 10, Wrocław',
      },
      {
        id: 3,
        firstName: 'Marek',
        lastName: 'Wiśniewski',
        pesel: '87032067890',
        birthDate: new Date('1987-03-20'),
        phone: '777666555',
        email: 'marek@gmail.com',
        address: 'ul. Polna 7, Poznań',
      },
    ],
  });

  await prisma.availability.createMany({
    data: [
      {
        doctorId: 1,
        date: new Date('2026-03-30'),
        startTime: new Date('2026-03-30T08:00:00'),
        endTime: new Date('2026-03-30T12:00:00'),
        isAvailable: true,
      },
      {
        doctorId: 1,
        date: new Date('2026-03-31'),
        startTime: new Date('2026-03-31T09:00:00'),
        endTime: new Date('2026-03-31T13:00:00'),
        isAvailable: true,
      },
      {
        doctorId: 2,
        date: new Date('2026-03-30'),
        startTime: new Date('2026-03-30T10:00:00'),
        endTime: new Date('2026-03-30T15:00:00'),
        isAvailable: true,
      },
    ],
  });

  await prisma.appointment.createMany({
    data: [
      {
        id: 1,
        patientId: 1,
        doctorId: 1,
        startTime: new Date('2026-03-30T08:00:00'),
        endTime: new Date('2026-03-30T08:30:00'),
        status: 'COMPLETED',
        reason: 'Ból brzucha',
        notes: 'Pacjent zgłasza ból od 2 dni',
      },
      {
        id: 2,
        patientId: 2,
        doctorId: 1,
        startTime: new Date('2026-03-30T09:00:00'),
        endTime: new Date('2026-03-30T09:30:00'),
        status: 'PLANNED',
        reason: 'Kontrola',
        notes: 'Wizyta kontrolna',
      },
      {
        id: 3,
        patientId: 3,
        doctorId: 2,
        startTime: new Date('2026-03-30T10:00:00'),
        endTime: new Date('2026-03-30T10:30:00'),
        status: 'PLANNED',
        reason: 'Ból kolana',
        notes: 'Podejrzenie przeciążenia',
      },
    ],
  });

  await prisma.visitNote.createMany({
    data: [
      {
        id: 1,
        patientId: 1,
        appointmentId: 1,
        doctorId: 1,
        diagnosis: 'Zapalenie żołądka',
        recommendations: 'Dieta lekkostrawna',
        medications: 'Omeprazol',
        notes: 'Stan stabilny',
      },
    ],
  });

  console.log('Seed finished successfully');
  console.log('Login credentials:');
  console.log('doctor1@clinic.pl / 123456');
  console.log('doctor2@clinic.pl / 123456');
  console.log('admin@clinic.pl / 123456');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
