import { BsThreeDots } from 'react-icons/bs';
import { BiDetail } from 'react-icons/bi';
import { CiEdit } from 'react-icons/ci';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import patientOne from '../../../../assets/patient-1.png';
import styles from './PatientsTable.module.scss';
import type { PatientsTableProps } from '../../types/patient.types';
import ErrorState from '../../../../components/Feedback/ErrorState';
import LoadingState from '../../../../components/Feedback/LoadingState';

export default function PatientsTable({
  patients,
  isLoading,
  error,
  searchTerm,
  page,
  setPage,
}: PatientsTableProps) {
  const navigate = useNavigate();

  const [openedMenu, setOpenedMenu] = useState<number | null>(null);

  const patientsPerPage = 8;

  const filteredPatients = useMemo(() => {
    const normalizedSearchTerm = searchTerm.toLowerCase().trim();

    if (!normalizedSearchTerm) {
      return patients;
    }

    return patients.filter((patient) => {
      const fullName = `${patient.firstName} ${patient.lastName}`.toLowerCase();

      return (
        fullName.includes(normalizedSearchTerm) ||
        patient.pesel.includes(normalizedSearchTerm) ||
        patient.email?.toLowerCase().includes(normalizedSearchTerm) ||
        patient.phone.includes(normalizedSearchTerm)
      );
    });
  }, [patients, searchTerm]);

  const totalPages = Math.ceil(filteredPatients.length / patientsPerPage);

  const visiblePatients = useMemo(() => {
    const startIndex = (page - 1) * patientsPerPage;
    const endIndex = startIndex + patientsPerPage;

    return filteredPatients.slice(startIndex, endIndex);
  }, [filteredPatients, page]);

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  return (
    <section className={styles.wrapper}>
      <div className={styles.table}>
        <div className={styles.header}>
          <div>Imię i nazwisko</div>
          <div>PESEL</div>
          <div>Email</div>
          <div>Telefon</div>
          <div>Akcje</div>
        </div>

        <div className={styles.body}>
          {visiblePatients.map((patient) => (
            <div key={patient.id} className={styles.row}>
              <div className={styles.patient}>
                <span
                  className={styles.avatar}
                  style={{ backgroundImage: `url(${patientOne})` }}
                />
                <strong>
                  {patient.firstName} {patient.lastName}
                </strong>
              </div>

              <div className={styles.cell}>{patient.pesel}</div>
              <div className={styles.cell}>{patient.email}</div>
              <div className={styles.cell}>{patient.phone}</div>

              <div className={styles.actions}>
                <button
                  type='button'
                  onClick={() => {
                    setOpenedMenu(
                      openedMenu === patient.id ? null : patient.id,
                    );
                  }}
                  className={styles.actionButton}
                >
                  <BsThreeDots />
                </button>

                {openedMenu === patient.id && (
                  <div className={styles.dropDown}>
                    <button
                      type='button'
                      className={styles.menuButton}
                      onClick={() =>
                        navigate(`/dashboard/patients/${patient.id}`)
                      }
                    >
                      <BiDetail className={styles.menuIcon} />
                      <span>Szczegóły</span>
                    </button>

                    <button
                      type='button'
                      className={styles.menuButton}
                      onClick={() =>
                        navigate(`/dashboard/patients/${patient.id}/edit`)
                      }
                    >
                      <CiEdit className={styles.menuIcon} />
                      <span>Edytuj</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            type='button'
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
          >
            Poprzednia
          </button>

          <span>
            {page} / {totalPages}
          </span>

          <button
            type='button'
            disabled={page === totalPages}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Następna
          </button>
        </div>
      )}
    </section>
  );
}
