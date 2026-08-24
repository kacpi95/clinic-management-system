import { useCalendarAppointments } from '../../../calendar/hooks/useCalendarAppointments';
import { getVisitReasonsStats } from '../../utils/getVisitReasonsStats';

import styles from './VisitTypesTable.module.scss';

export default function VisitTypesTable() {
  const { calendarAppointments } = useCalendarAppointments();

  const visitReasons = getVisitReasonsStats(calendarAppointments);

  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <div>
          <h2>Najczęstsze powody wizyt</h2>
          <p>Podsumowanie bieżącego miesiąca</p>
        </div>
      </div>

      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <span>Powód wizyty</span>
          <span>Liczba</span>
          <span>Udział</span>
        </div>

        {visitReasons.map((item) => (
          <div key={item.reason} className={styles.row}>
            <strong>{item.reason}</strong>
            <span>{item.count}</span>
            <span>{item.percentage}%</span>
          </div>
        ))}
      </div>
    </section>
  );
}
