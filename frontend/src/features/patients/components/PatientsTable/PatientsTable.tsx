import { BsThreeDots } from 'react-icons/bs';
import { BiDetail } from 'react-icons/bi';
import { CiEdit } from 'react-icons/ci';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import patientOne from '../../../../assets/patient-1.png';
import styles from './PatientsTable.module.scss';
import { usePatients } from '../../hooks/usePatients';
import type { PatientsTableProps } from '../../types/patient.types';

export default function PatientsTable({ searchTerm }: PatientsTableProps) {
  const navigate = useNavigate();

  const { patients, isLoading, error } = usePatients();

  const [openedMenu, setOpenedMenu] = useState<number | null>(null);

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

  if (isLoading) {
    return <div>Ładowanie danych</div>;
  }

  if (error) {
    return <div>{error}</div>;
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
          {filteredPatients.map((patient) => (
            <div key={patient.id} className={styles.row}>
              <div className={styles.patient}>
                <span
                  className={styles.avatar}
                  style={{ backgroundImage: `url(${patientOne})` }}
                ></span>
                <strong>
                  {patient.firstName} {patient.lastName}
                </strong>
              </div>
              <div className={styles.cell}>{patient.pesel}</div>
              <div className={styles.cell}>{patient.email}</div>
              <div className={styles.cell}>{patient.phone}</div>

              <div className={styles.actions}>
                <button
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
                      className={styles.menuButton}
                      onClick={() =>
                        navigate(`/dashboard/patients/${patient.id}`)
                      }
                    >
                      <BiDetail className={styles.menuIcon} />
                      <span>Szczegóły</span>
                    </button>

                    <button
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
    </section>
  );
}
