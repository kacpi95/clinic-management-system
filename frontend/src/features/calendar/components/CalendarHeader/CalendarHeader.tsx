import styles from './CalendarHeader.module.scss';

export default function CalendarHeader() {
  const date = new Date();

  const formattedDate = date.toLocaleDateString('pl-PL', {
    month: 'long',
    year: 'numeric',
  });

  const capitalizedDate =
    formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <p className={styles.eyebrow}>HARMONOGRAM</p>
        <h1 className={styles.title}>{capitalizedDate}</h1>
        <p className={styles.description}>
          Zarządzaj wizytami i harmonogramem.
        </p>
      </div>
      <div className={styles.actions}>
        <button className={styles.active}>Miesiąc</button>
        <button>Tydzień</button>
        <button>Dzień</button>
      </div>
    </div>
  );
}
