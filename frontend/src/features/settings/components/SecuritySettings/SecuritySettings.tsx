import styles from './SecuritySettings.module.scss';

export default function SecuritySettings() {
  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <h2 className={styles.title}>Bezpieczeństwo</h2>
        <p>Zarządzaj hasłem do swojego konta.</p>
      </div>
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
        <button type='button'>Zmień hasło</button>
      </div>
    </section>
  );
}
