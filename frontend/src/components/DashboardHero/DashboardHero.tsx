import { useAuth } from '../../context/useAuth';
import styles from './DashboardHero.module.scss';

export default function DashboardHero() {
  const { user } = useAuth();

  const doctor = user?.doctor;

  const date = new Date();

  const formattedDate = date.toLocaleDateString('pl-PL', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  const capitalizedDate =
    formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

  return (
    <section className={styles.wrapper}>
      <div className={styles.content}>
        

        <h1 className={styles.title}>
          Dzień dobry, <span>{doctor?.firstName || 'Doktorze'}.</span>
        </h1>
      </div>

      <div className={styles.dateSection}>
        <p className={styles.date}>{capitalizedDate}</p>

        <span className={styles.subtitle}>Życzymy spokojnego dnia pracy</span>
      </div>
    </section>
  );
}
