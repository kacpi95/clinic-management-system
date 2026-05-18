import patientOne from '../../../assets/patient-1.png';
import patientTwo from '../../../assets/patient-2.png';
import patientThree from '../../../assets/patient-3.png';

export const stats = {
  planned: 8,
  completed: 5,
  active: 3,
  newPatients: 4,
  alerts: 2,
};

export const appointments = [
  {
    time: '09:30',
    patient: 'Jan Kowalski',
    photo: patientOne,
    reason: 'Kontrola pooperacyjna',
    status: 'Aktywna',
  },
  {
    time: '10:15',
    patient: 'Kacper Nowak',
    photo: patientTwo,
    reason: 'Badanie kontrolne',
    status: 'Nowy pacjent',
  },
  {
    time: '11:30',
    patient: 'Daria Kowalczyk',
    photo: patientThree,
    reason: 'Wizyta kontrolna',
    status: 'Oczekuje',
  },
];


export const flowItems = [
  { label: 'Ukończone wizyty', value: '24' },
  { label: 'Nowi pacjenci', value: '6' },
  { label: 'Śr. czas konsultacji', value: '22 min' },
];