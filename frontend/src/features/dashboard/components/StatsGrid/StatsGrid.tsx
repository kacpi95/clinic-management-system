import styles from './StatsGrid.module.scss';
import MainCard from '../MainCard/MainCard';
import SideCards from '../SideCards/SideCards';

export default function StatsGrid() {
  return (
    <section className={styles.wrapper}>
      <MainCard />
      <SideCards />
    </section>
  );
}
