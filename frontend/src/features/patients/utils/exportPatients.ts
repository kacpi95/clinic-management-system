export function downloadPatientsJson(patients: unknown[]) {
  const blob = new Blob([JSON.stringify(patients, null, 2)], {
    type: 'application/json',
  });

  const link = document.createElement('a');

  link.href = URL.createObjectURL(blob);
  link.download = 'patients-array.json';

  link.click();

  URL.revokeObjectURL(link.href);
}
