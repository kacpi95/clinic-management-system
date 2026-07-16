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

  const availability = [];

  const doctorOneSchedule = {
    1: [8, 16],
    2: [9, 17],
    3: [8, 14],
    4: [10, 18],
    5: [8, 15],
  };

  const doctorTwoSchedule = {
    1: [10, 17],
    3: [9, 16],
    5: [8, 14],
  };

  for (let day = -14; day <= 21; day++) {
    const weekDay = getWeekDay(day);

    if (doctorOneSchedule[weekDay]) {
      const [start, end] = doctorOneSchedule[weekDay];

      availability.push({
        doctorId: 1,
        date: addDays(day),
        startTime: createDateTime(day, start),
        endTime: createDateTime(day, end),
        isAvailable: true,
      });
    }

    if (doctorTwoSchedule[weekDay]) {
      const [start, end] = doctorTwoSchedule[weekDay];

      availability.push({
        doctorId: 2,
        date: addDays(day),
        startTime: createDateTime(day, start),
        endTime: createDateTime(day, end),
        isAvailable: true,
      });
    }
  }

  await prisma.availability.createMany({
    data: availability,
  });

  const reasons = [
    'Kontrola',
    'Badanie kontrolne',
    'Konsultacja chirurgiczna',
    'Ból brzucha',
    'Ból gardła',
    'Kontrola po zabiegu',
    'Zmiana opatrunku',
    'Badanie okresowe',
    'Omówienie wyników',
    'USG',
    'Silny ból pleców',
    'Podejrzenie przepukliny',
    'Kontrola po operacji',
    'Dolegliwości bólowe',
  ];

  const notes = [
    '',
    '',
    '',
    'Pacjent zgłasza poprawę.',
    'Pierwsza konsultacja.',
    'Do wykonania RTG.',
    'Do wykonania USG.',
    'Kontrola za miesiąc.',
    'Pacjent zgłasza ból od kilku dni.',
    'Zalecana obserwacja.',
  ];

  const slots = [
    [8, 0],
    [8, 30],
    [9, 0],
    [9, 30],
    [10, 30],
    [11, 30],
    [13, 0],
    [13, 30],
    [14, 30],
    [15, 30],
  ];

  const appointments = [];

  let appointmentId = 1;

  for (let day = -14; day <= -1; day++) {
    const weekDay = getWeekDay(day);

    if (weekDay === 0 || weekDay === 6) {
      continue;
    }

    const visitsToday = 2 + Math.floor(Math.random() * 4);

    for (let i = 0; i < visitsToday; i++) {
      const slot = slots[i];

      const patientId = 1 + Math.floor(Math.random() * 15);

      appointments.push({
        id: appointmentId++,
        patientId,
        doctorId: 1,

        startTime: createDateTime(day, slot[0], slot[1]),

        endTime: createDateTime(
          day,
          slot[1] === 30 ? slot[0] + 1 : slot[0],
          slot[1] === 30 ? 0 : 30,
        ),

        status: Math.random() > 0.12 ? 'COMPLETED' : 'CANCELED',

        reason: randomItem(reasons),

        notes: randomItem(notes),
      });
    }
  }

  const todaySlots = [
    [8, 0],
    [9, 0],
    [10, 30],
    [13, 0],
    [14, 30],
  ];

  for (let i = 0; i < todaySlots.length; i++) {
    const slot = todaySlots[i];

    appointments.push({
      id: appointmentId++,

      patientId: i + 1,

      doctorId: 1,

      startTime: createDateTime(0, slot[0], slot[1]),

      endTime: createDateTime(
        0,
        slot[1] === 30 ? slot[0] + 1 : slot[0],
        slot[1] === 30 ? 0 : 30,
      ),

      status: 'PLANNED',

      reason: randomItem(reasons),

      notes: randomItem(notes),
    });
  }

  for (let day = 1; day <= 14; day++) {
    const weekDay = getWeekDay(day);

    if (weekDay === 0 || weekDay === 6) {
      continue;
    }

    const visitsToday = 3 + Math.floor(Math.random() * 5);

    const availableSlots = [...slots];

    for (let i = 0; i < visitsToday; i++) {
      const randomIndex = Math.floor(Math.random() * availableSlots.length);

      const slot = availableSlots.splice(randomIndex, 1)[0];

      const patientId = 1 + Math.floor(Math.random() * 15);

      appointments.push({
        id: appointmentId++,

        patientId,

        doctorId: 1,

        startTime: createDateTime(day, slot[0], slot[1]),

        endTime: createDateTime(
          day,
          slot[1] === 30 ? slot[0] + 1 : slot[0],
          slot[1] === 30 ? 0 : 30,
        ),

        status: 'PLANNED',

        reason: randomItem(reasons),

        notes: randomItem(notes),
      });
    }
  }

  for (let day = -5; day <= 14; day++) {
    const weekDay = getWeekDay(day);

    if (![1, 3, 5].includes(weekDay)) {
      continue;
    }

    const visitsToday = 2 + Math.floor(Math.random() * 3);

    const availableSlots = [...slots];

    for (let i = 0; i < visitsToday; i++) {
      const randomIndex = Math.floor(Math.random() * availableSlots.length);

      const slot = availableSlots.splice(randomIndex, 1)[0];

      const patientId = 1 + Math.floor(Math.random() * 15);

      appointments.push({
        id: appointmentId++,

        patientId,

        doctorId: 2,

        startTime: createDateTime(day, slot[0], slot[1]),

        endTime: createDateTime(
          day,
          slot[1] === 30 ? slot[0] + 1 : slot[0],
          slot[1] === 30 ? 0 : 30,
        ),

        status: day < 0 ? 'COMPLETED' : 'PLANNED',

        reason: randomItem(reasons),

        notes: randomItem(notes),
      });
    }
  }

  await prisma.appointment.createMany({
    data: appointments,
  });

  const diagnoses = [
    'Zapalenie gardła',
    'Przeziębienie',
    'Nadciśnienie tętnicze',
    'Migrena',
    'Stan po zabiegu',
    'Zapalenie zatok',
    'Ból kręgosłupa',
    'Przeciążenie mięśni',
    'Alergia sezonowa',
    'Infekcja wirusowa',
    'Zapalenie oskrzeli',
    'Zapalenie ucha',
  ];

  const recommendations = [
    'Kontrola za 2 tygodnie.',
    'Odpoczynek i odpowiednie nawodnienie.',
    'Przyjmować leki zgodnie z zaleceniami.',
    'Wykonać badania kontrolne.',
    'Unikać wysiłku fizycznego.',
    'Zgłosić się ponownie w razie pogorszenia.',
    'Kontrola za miesiąc.',
    'Zwiększyć aktywność fizyczną.',
    'Ograniczyć stres.',
    'Zmiana diety.',
  ];

  const medications = [
    'Ibuprofen',
    'Paracetamol',
    'Amotaks',
    'Augmentin',
    'No-Spa',
    'Ketonal',
    'Diclofenac',
    'Prestarium',
    'Sumatriptan',
    'Brak nowych leków',
  ];

  const visitNotes = [];

  let noteId = 1;

  for (const appointment of appointments) {
    if (appointment.status !== 'COMPLETED') {
      continue;
    }

    visitNotes.push({
      id: noteId++,

      appointmentId: appointment.id,

      patientId: appointment.patientId,

      doctorId: appointment.doctorId,

      diagnosis: randomItem(diagnoses),

      recommendations: randomItem(recommendations),

      medications: randomItem(medications),

      notes:
        'Pacjent zgłosił się na wizytę. Stan ogólny dobry. Zalecono dalszą obserwację.',
    });
  }

  await prisma.visitNote.createMany({
    data: visitNotes,
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
