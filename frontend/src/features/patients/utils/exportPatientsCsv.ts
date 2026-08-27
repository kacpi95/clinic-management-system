import type { Patient } from '../types/patient.types';

export function exportPatientsCsv(patients: Patient[]) {
  if (!patients.length) return;

  const headers = [
    'Imię',
    'Nazwisko',
    'PESEL',
    'Email',
    'Telefon',
    'Adres',
    'Data urodzenia',
  ];

  const rows = patients.map((patient) => [
    patient.firstName,
    patient.lastName,
    patient.pesel,
    patient.email ?? '',
    patient.phone,
    patient.address,
    new Date(patient.birthDate).toLocaleDateString('pl-PL'),
  ]);

  const csv = [headers, ...rows]
    .map((row) =>
      row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(';'),
    )
    .join('\n');

  const blob = new Blob([`\uFEFF${csv}`], {
    type: 'text/csv;charset=utf-8;',
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');

  link.href = url;
  link.download = `pacjenci-${new Date().toISOString().slice(0, 10)}.csv`;

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
