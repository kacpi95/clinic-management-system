import { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import toast from 'react-hot-toast';

import styles from './SecuritySettings.module.scss';
import { ChangePassword } from '../../services/settings.api';

export default function SecuritySettings() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [viewPassword, setViewPassword] = useState(false);

  const [errors, setErrors] = useState({
    password: '',
    newPassword: '',
    repeatPassword: '',
  });

  const passwordType = viewPassword ? 'text' : 'password';

  const resetForm = () => {
    setPassword('');
    setNewPassword('');
    setRepeatPassword('');
    setViewPassword(false);

    setErrors({
      password: '',
      newPassword: '',
      repeatPassword: '',
    });
  };

  const handleCancel = () => {
    resetForm();
    setIsEditing(false);
  };

  const validate = () => {
    const newErrors = {
      password: '',
      newPassword: '',
      repeatPassword: '',
    };

    let isValid = true;

    if (!password.trim()) {
      newErrors.password = 'Aktualne hasło jest wymagane';
      isValid = false;
    }

    if (!newPassword.trim()) {
      newErrors.newPassword = 'Nowe hasło jest wymagane';
      isValid = false;
    } else if (newPassword.length < 6) {
      newErrors.newPassword = 'Nowe hasło musi mieć minimum 6 znaków';
      isValid = false;
    }

    if (!repeatPassword.trim()) {
      newErrors.repeatPassword = 'Powtórzenie hasła jest wymagane';
      isValid = false;
    } else if (newPassword !== repeatPassword) {
      newErrors.repeatPassword = 'Hasła nie są takie same';
      isValid = false;
    }

    if (password && newPassword && password === newPassword) {
      newErrors.newPassword = 'Nowe hasło musi być inne niż aktualne';
      isValid = false;
    }

    setErrors(newErrors);

    return isValid;
  };

  const handleSave = async () => {
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await ChangePassword({
        currentPassword: password,
        newPassword,
      });

      toast.success('Hasło zostało zmienione');

      resetForm();
      setIsEditing(false);
    } catch (error) {
      console.error(error);

      toast.error(
        error instanceof Error ? error.message : 'Nie udało się zmienić hasła',
      );
    } finally {
      setIsSubmitting(false);
    }
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
                onChange={(e) => {
                  setPassword(e.target.value);

                  if (errors.password) {
                    setErrors((prev) => ({
                      ...prev,
                      password: '',
                    }));
                  }
                }}
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
            {errors.password && (
              <span className={styles.error}>{errors.password}</span>
            )}
          </div>

          <div className={styles.passwordField}>
            <label>Nowe hasło</label>

            <div className={styles.inputWrapper}>
              <input
                type={passwordType}
                value={newPassword}
                placeholder='Nowe hasło'
                onChange={(e) => {
                  setNewPassword(e.target.value);

                  if (errors.newPassword) {
                    setErrors((prev) => ({
                      ...prev,
                      newPassword: '',
                    }));
                  }
                }}
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

            {errors.newPassword && (
              <span className={styles.error}>{errors.newPassword}</span>
            )}
          </div>

          <div className={styles.passwordField}>
            <label>Powtórz nowe hasło</label>

            <div className={styles.inputWrapper}>
              <input
                type={passwordType}
                value={repeatPassword}
                placeholder='Powtórz nowe hasło'
                onChange={(e) => {
                  setRepeatPassword(e.target.value);

                  if (errors.repeatPassword) {
                    setErrors((prev) => ({
                      ...prev,
                      repeatPassword: '',
                    }));
                  }
                }}
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

            {errors.repeatPassword && (
              <span className={styles.error}>{errors.repeatPassword}</span>
            )}
          </div>

          <div className={styles.buttons}>
            <button
              type='button'
              className={styles.cancelButton}
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Anuluj
            </button>

            <button
              type='button'
              className={styles.saveButton}
              onClick={handleSave}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Zapisywanie...' : 'Zapisz nowe hasło'}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
