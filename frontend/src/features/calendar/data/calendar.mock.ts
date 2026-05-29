export const filters = [
  {
    id: 1,
    name: 'Pilne przypadki',
    number: 3,
    variant: 'urgent',
  },
  {
    id: 2,
    name: 'Potwierdzone',
    number: 18,
    variant: 'confirmed',
  },
  {
    id: 3,
    name: 'Rutynowe badania',
    number: 12,
    variant: 'routine',
  },
];

export const events = [
  {
    title: 'Konsultacja',
    start: '2026-05-02',
  },
  {
    title: 'Kontrola',
    start: '2026-05-07',
  },
  {
    title: 'Pilny przypadek',
    start: '2026-05-14',
  },
  {
    title: 'Badanie rutynowe',
    start: '2026-05-19',
  },
];

export const appointments = [
  {
    id: 1,
    time: '09:00',
    patient: 'Jan Kowalski',
    type: 'Kontrola',
  },
  {
    id: 2,
    time: '10:30',
    patient: 'Anna Nowak',
    type: 'Konsultacja',
  },
  {
    id: 3,
    time: '12:00',
    patient: 'Piotr Wiśniewski',
    type: 'Badanie',
  },
];
