import { useAuth } from '../../../../context/useAuth';
import styles from './SystemInfo.module.scss';

export default function SystemInfo() {
  const { user } = useAuth();

  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <h2 className={styles.title}>Informacje</h2>
        <p>Informacje o koncie i aplikacji.</p>
      </div>

      <div className={styles.details}>
        <div className={styles.item}>
          <span>Rola</span>
          <strong>Lekarz</strong>
        </div>

        <div className={styles.item}>
          <span>ID użytkownika</span>
          <strong>#{user?.id}</strong>
        </div>

        <div className={styles.item}>
          <span>Wersja aplikacji</span>
          <strong>1.0.0</strong>
        </div>

        <div className={styles.item}>
          <span>Status</span>
          <strong className={styles.status}>Aktywne</strong>
        </div>
      </div>
    </section>
  );
}
