import { visitTypes } from '../../data/analytics.mock';
import styles from './VisitTypesTable.module.scss';

export default function VisitTypesTable() {
  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <h2>Najczęstsze typy wizyt</h2>
        <button>Pobierz raport</button>
      </div>

      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <span>Typ wizyty</span>
          <span>Liczba</span>
          <span>Zmiana</span>
          <span>Status</span>
        </div>

        {visitTypes.map(item => (
          <div key={item.id} className={styles.row}>
            <strong>{item.type}</strong>
            <span>{item.count}</span>
            <span>{item.growth}</span>
            <span>{item.status}</span>
          </div>
        ))}
      </div>
    </section>
  );
}