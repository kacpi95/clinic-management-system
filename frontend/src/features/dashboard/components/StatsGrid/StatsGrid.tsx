import styles from './StatsGrid.module.scss';
import MainCard from '../MainCard/MainCard';
import SideCards from '../SideCards/SideCards';
import TodaysAppointment from '../TodaysAppointment/TodaysAppointment';

export default function StatsGrid() {
  return (
    <section className={styles.wrapper}>
      <MainCard />
      <SideCards />
      <TodaysAppointment />
    </section>
  );
}
