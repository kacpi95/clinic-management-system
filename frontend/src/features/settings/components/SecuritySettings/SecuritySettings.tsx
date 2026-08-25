import { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

import styles from './SecuritySettings.module.scss';

export default function SecuritySettings() {
  const [isEditing, setIsEditing] = useState(false);

  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [viewPassword, setViewPassword] = useState(false);
  const passwordType = viewPassword ? 'text' : 'password';

  const handleCancel = () => {
    setIsEditing(false);
    setPassword('');
    setNewPassword('');
    setRepeatPassword('');
    setViewPassword(false);
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <h2 className={styles.title}>Bezpieczeństwo</h2>
        <p>Zarządzaj hasłem do swojego konta.</p>
      </div>

      {!isEditing ? (
        <>
          <div className={styles.content}>
            <div className={styles.passwordInfo}>
              <div>
                <h3>Hasło</h3>
                <p>••••••••••••</p>
              </div>

              <span>Aktywne</span>
            </div>

            <p className={styles.info}>
              Dla bezpieczeństwa regularnie aktualizuj swoje hasło.
            </p>
          </div>

          <div className={styles.actions}>
            <button type='button' onClick={() => setIsEditing(true)}>
              Zmień hasło
            </button>
          </div>
        </>
      ) : (
        <div className={styles.content}>
          <div className={styles.passwordField}>
            <label>Aktualne hasło</label>

            <div className={styles.inputWrapper}>
              <input
                type={passwordType}
                value={password}
                placeholder='Aktualne hasło'
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type='button'
                className={styles.eyeButton}
                onClick={() => setViewPassword((prev) => !prev)}
                aria-label={viewPassword ? 'Ukryj hasło' : 'Pokaż hasło'}
              >
                {viewPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </div>
          </div>

          <div className={styles.passwordField}>
            <label>Nowe hasło</label>

            <div className={styles.inputWrapper}>
              <input
                type={passwordType}
                value={newPassword}
                placeholder='Nowe hasło'
                onChange={(e) => setNewPassword(e.target.value)}
              />

              <button
                type='button'
                className={styles.eyeButton}
                onClick={() => setViewPassword((prev) => !prev)}
                aria-label={viewPassword ? 'Ukryj hasło' : 'Pokaż hasło'}
              >
                {viewPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </div>
          </div>

          <div className={styles.passwordField}>
            <label>Powtórz nowe hasło</label>

            <div className={styles.inputWrapper}>
              <input
                type={passwordType}
                value={repeatPassword}
                placeholder='Powtórz nowe hasło'
                onChange={(e) => setRepeatPassword(e.target.value)}
              />

              <button
                type='button'
                className={styles.eyeButton}
                onClick={() => setViewPassword((prev) => !prev)}
                aria-label={viewPassword ? 'Ukryj hasło' : 'Pokaż hasło'}
              >
                {viewPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </div>
          </div>

          <div className={styles.buttons}>
            <button
              type='button'
              className={styles.cancelButton}
              onClick={handleCancel}
            >
              Anuluj
            </button>

            <button type='button' className={styles.saveButton}>
              Zapisz nowe hasło
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
