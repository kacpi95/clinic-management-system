import styles from './AnalyticsHeader.module.scss';

export default function AnalyticsHeader() {
  return (
    <section className={styles.wrapper}>
      <div>
        <p className={styles.eyebrow}>PODSUMOWANIE PRAKTYKI</p>
        <h1 className={styles.title}>Analityka</h1>
        <p className={styles.description}>
          Przegląd wizyt, pacjentów i aktywności gabinetu.
        </p>
      </div>

      <div className={styles.actions}>
        <button className={styles.active}>7 dni</button>
        <button>30 dni</button>
        <button>90 dni</button>
      </div>
    </section>
  );
}
