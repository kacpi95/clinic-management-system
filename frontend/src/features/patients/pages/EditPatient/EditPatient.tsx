import { useParams } from 'react-router-dom';
import PatientForm from '../../components/PatientForm/PatientForm';
import { usePatient } from '../../hooks/usePatient';
import LoadingState from '../../../../components/Feedback/LoadingState';
import ErrorState from '../../../../components/Feedback/ErrorState';

export default function EditPatient() {
  const { id } = useParams();
  const { patient, isLoading, error } = usePatient(Number(id));

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error} />;
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
