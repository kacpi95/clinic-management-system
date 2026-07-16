import { useParams } from 'react-router-dom';
import PatientForm from '../../components/PatientForm/PatientForm';
import { usePatient } from '../../hooks/usePatient';

export default function EditPatient() {
  const { id } = useParams();
  const { patient, isLoading, error } = usePatient(Number(id));

  if (isLoading) {
    return <div>Ładowanie...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!patient) {
    return <div>Nie znaleziono pacjenta.</div>;
  }
  return (
    <div>
      <PatientForm patient={patient} />
    </div>
  );
}
