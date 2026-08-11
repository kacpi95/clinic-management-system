import styles from './StatsGrid.module.scss';
import MainCard from '../MainCard/MainCard';
import SideCards from '../SideCards/SideCards';
import TodaysAppointments from '../TodaysAppointment/TodaysAppointments';

export default function StatsGrid() {
  return (
    <section className={styles.wrapper}>
      <MainCard />
      <SideCards />
      <TodaysAppointments />
    </section>
  );
}
