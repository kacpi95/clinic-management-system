import { prisma } from '../prismaClient/client.js';
import bcrypt from 'bcrypt';

const today = new Date();

function addDays(days) {
  const date = new Date(today);
  date.setDate(date.getDate() + days);
  date.setHours(0, 0, 0, 0);

  return date;
}

function createDateTime(days, hour, minute = 0) {
  const date = addDays(days);

  date.setHours(hour, minute, 0, 0);

  return date;
}

function getWeekDay(days) {
  return addDays(days).getDay();
}

function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

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
      {
        id: 4,
        firstName: 'Daria',
        lastName: 'Kowalczyk',
        pesel: '91082611223',
        birthDate: new Date('1991-08-26'),
        phone: '666555444',
        email: 'daria@gmail.com',
        address: 'ul. Słoneczna 4, Warszawa',
      },
      {
        id: 5,
        firstName: 'Tomasz',
        lastName: 'Lewandowski',
        pesel: '78040233445',
        birthDate: new Date('1978-04-02'),
        phone: '555444333',
        email: 'tomasz@gmail.com',
        address: 'ul. Długa 12, Gdańsk',
      },
      {
        id: 6,
        firstName: 'Julia',
        lastName: 'Zielińska',
        pesel: '02021445678',
        birthDate: new Date('2002-02-14'),
        phone: '501234567',
        email: 'julia@gmail.com',
        address: 'ul. Kwiatowa 8, Wrocław',
      },
      {
        id: 7,
        firstName: 'Paweł',
        lastName: 'Kamiński',
        pesel: '85061198765',
        birthDate: new Date('1985-06-11'),
        phone: '502345678',
        email: 'pawel@gmail.com',
        address: 'ul. Wiosenna 14, Opole',
      },
      {
        id: 8,
        firstName: 'Karolina',
        lastName: 'Wójcik',
        pesel: '93093011223',
        birthDate: new Date('1993-09-30'),
        phone: '503456789',
        email: 'karolina@gmail.com',
        address: 'ul. Brzozowa 22, Katowice',
      },
      {
        id: 9,
        firstName: 'Patryk',
        lastName: 'Kaczmarek',
        pesel: '89041833445',
        birthDate: new Date('1989-04-18'),
        phone: '504567890',
        email: 'patryk@gmail.com',
        address: 'ul. Krótka 3, Łódź',
      },
      {
        id: 10,
        firstName: 'Monika',
        lastName: 'Mazur',
        pesel: '96072355667',
        birthDate: new Date('1996-07-23'),
        phone: '505678901',
        email: 'monika@gmail.com',
        address: 'ul. Szkolna 6, Poznań',
      },
      {
        id: 11,
        firstName: 'Michał',
        lastName: 'Sikora',
        pesel: '81030577889',
        birthDate: new Date('1981-03-05'),
        phone: '506789012',
        email: 'michal@gmail.com',
        address: 'ul. Zielona 19, Lublin',
      },
      {
        id: 12,
        firstName: 'Natalia',
        lastName: 'Dąbrowska',
        pesel: '00081299123',
        birthDate: new Date('2000-08-12'),
        phone: '507890123',
        email: 'natalia@gmail.com',
        address: 'ul. Spacerowa 5, Gdynia',
      },
      {
        id: 13,
        firstName: 'Adam',
        lastName: 'Lis',
        pesel: '92041011122',
        birthDate: new Date('1992-04-10'),
        phone: '508901234',
        email: 'adam@gmail.com',
        address: 'ul. Jesienna 2, Szczecin',
      },
      {
        id: 14,
        firstName: 'Barbara',
        lastName: 'Król',
        pesel: '88012233344',
        birthDate: new Date('1988-01-22'),
        phone: '509012345',
        email: 'barbara@gmail.com',
        address: 'ul. Morska 7, Gdynia',
      },
      {
        id: 15,
        firstName: 'Piotr',
        lastName: 'Walczak',
        pesel: '94060244455',
        birthDate: new Date('1994-06-02'),
        phone: '510123456',
        email: 'piotr@gmail.com',
        address: 'ul. Lipowa 17, Rzeszów',
      },
    ],
  });

  await prisma.availability.createMany({
    data: [
      {
        doctorId: 1,
        date: new Date('2026-06-06'),
        startTime: new Date('2026-06-06T08:00:00'),
        endTime: new Date('2026-06-06T16:00:00'),
        isAvailable: true,
      },
      {
        doctorId: 1,
        date: new Date('2026-06-07'),
        startTime: new Date('2026-06-07T09:00:00'),
        endTime: new Date('2026-06-07T14:00:00'),
        isAvailable: true,
      },
      {
        doctorId: 2,
        date: new Date('2026-06-06'),
        startTime: new Date('2026-06-06T10:00:00'),
        endTime: new Date('2026-06-06T15:00:00'),
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
        startTime: new Date('2026-06-06T08:30:00'),
        endTime: new Date('2026-06-06T09:00:00'),
        status: 'COMPLETED',
        reason: 'Kontrola po leczeniu',
        notes: 'Pacjent zgłasza poprawę samopoczucia',
      },
      {
        id: 2,
        patientId: 2,
        doctorId: 1,
        startTime: new Date('2026-06-06T10:00:00'),
        endTime: new Date('2026-06-06T10:30:00'),
        status: 'PLANNED',
        reason: 'Konsultacja',
        notes: 'Pierwsza wizyta kontrolna',
      },
      {
        id: 3,
        patientId: 3,
        doctorId: 1,
        startTime: new Date('2026-06-06T12:00:00'),
        endTime: new Date('2026-06-06T12:30:00'),
        status: 'PLANNED',
        reason: 'Badanie kontrolne',
        notes: 'Pacjent po wcześniejszej konsultacji',
      },
      {
        id: 4,
        patientId: 4,
        doctorId: 1,
        startTime: new Date('2026-06-07T09:30:00'),
        endTime: new Date('2026-06-07T10:00:00'),
        status: 'PLANNED',
        reason: 'Follow-up',
        notes: 'Omówienie wyników badań',
      },
      {
        id: 5,
        patientId: 5,
        doctorId: 2,
        startTime: new Date('2026-06-06T11:00:00'),
        endTime: new Date('2026-06-06T11:30:00'),
        status: 'PLANNED',
        reason: 'Ból kolana',
        notes: 'Podejrzenie przeciążenia',
      },
      {
        id: 6,
        patientId: 2,
        doctorId: 1,
        startTime: new Date('2026-06-05T14:00:00'),
        endTime: new Date('2026-06-05T14:30:00'),
        status: 'CANCELED',
        reason: 'Konsultacja',
        notes: 'Pacjent odwołał wizytę',
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
        diagnosis: 'Stan po leczeniu zachowawczym',
        recommendations:
          'Kontynuować obserwację i zgłosić się na kontrolę za 4 tygodnie',
        medications: 'Brak nowych leków',
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
