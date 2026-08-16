import styles from './AnalyticsHeader.module.scss';

export default function AnalyticsHeader() {
  const currentMonth = new Date().toLocaleDateString('pl-PL', {
    month: 'long',
    year: 'numeric',
  });

  const formattedMonth =
    currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1);

  return (
    <section className={styles.wrapper}>
      <div>
        <p className={styles.eyebrow}>PODSUMOWANIE PRAKTYKI</p>
        <h1 className={styles.title}>Analityka</h1>
        <p className={styles.description}>
          Przegląd wizyt, pacjentów i aktywności gabinetu.
        </p>
      </div>
      <div className={styles.period}>
        <span>Okres</span>
        <strong>{formattedMonth}</strong>
      </div>
    </section>
  );
}
