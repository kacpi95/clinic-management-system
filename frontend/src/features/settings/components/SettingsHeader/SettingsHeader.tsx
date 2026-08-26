import styles from './SettingsHeader.module.scss';

export default function SettingsHeader() {
  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>USTAWIENIA</h2>
      <p className={styles.description}>
        Zarządzaj swoim profilem i preferencjami aplikacji.
      </p>
    </section>
  );
}
