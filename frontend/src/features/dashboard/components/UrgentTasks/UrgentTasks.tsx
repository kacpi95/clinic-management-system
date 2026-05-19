import styles from './UrgentTasks.module.scss';
import { tasks } from '../../data/stats.mock';

export default function UrgentTasks() {
  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>FOLLOW-UP</p>
          <h2>Pilne zadania</h2>
        </div>

        <span className={styles.counter}>{tasks.length}</span>
      </div>

      <ul className={styles.list}>
        {tasks.map((task) => (
          <li key={task.title} className={styles.item}>
            <div className={styles.dot} />

            <div className={styles.content}>
              <div className={styles.itemHeader}>
                <h3>{task.title}</h3>
                <span>{task.priority}</span>
              </div>

              <p>{task.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
