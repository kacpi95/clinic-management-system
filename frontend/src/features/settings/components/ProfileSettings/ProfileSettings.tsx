import { useState } from 'react';

import { useAuth } from '../../../../context/useAuth';
import styles from './ProfileSettings.module.scss';

export default function ProfileSettings() {
  const { user } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(user?.doctor?.firstName || '');
  const [lastName, setLastName] = useState(user?.doctor?.lastName || '');
  const [specialization, setSpecialization] = useState(
    user?.doctor?.specialization || '',
  );
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.doctor?.phone || '');

  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>DANE KONTA</p>
          <h2 className={styles.title}>Profil</h2>
        </div>

        <div className={styles.actions}>
          {isEditing && (
            <button
              type='button'
              className={styles.cancelButton}
              onClick={() => setIsEditing(false)}
            >
              Anuluj
            </button>
          )}

          <button
            type='button'
            className={styles.editButton}
            onClick={() => setIsEditing((prev) => !prev)}
          >
            {isEditing ? 'Zapisz' : 'Edytuj profil'}
          </button>
        </div>
      </div>

      <div className={styles.profile}>
        <div className={styles.avatar}>
          {user?.doctor?.firstName?.charAt(0)}
          {user?.doctor?.lastName?.charAt(0)}
        </div>

        <div className={styles.profileContent}>
          {isEditing ? (
            <div className={styles.nameFields}>
              <input
                type='text'
                value={firstName}
                placeholder='Imię'
                onChange={(e) => setFirstName(e.target.value)}
              />

              <input
                type='text'
                value={lastName}
                placeholder='Nazwisko'
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          ) : (
            <h3>
              {user?.doctor?.firstName} {user?.doctor?.lastName}
            </h3>
          )}

          {!isEditing && <p>{user?.doctor?.specialization}</p>}
        </div>
      </div>

      <div className={styles.details}>
        <div className={styles.detail}>
          <span>E-mail</span>

          {isEditing ? (
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          ) : (
            <strong>{user?.email}</strong>
          )}
        </div>

        <div className={styles.detail}>
          <span>Telefon</span>

          {isEditing ? (
            <input
              type='tel'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          ) : (
            <strong>{user?.doctor?.phone}</strong>
          )}
        </div>

        <div className={styles.detail}>
          <span>Specjalizacja</span>

          {isEditing ? (
            <input
              type='text'
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
            />
          ) : (
            <strong>{user?.doctor?.specialization}</strong>
          )}
        </div>
      </div>
    </section>
  );
}
