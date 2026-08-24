import SettingsHeader from '../../features/settings/components/SettingsHeader/SettingsHeader';
import styles from './Settings.module.scss';

export default function Settings() {
  return (
    <div className={styles.wrapper}>
      <SettingsHeader />
      <div className={styles.grid}></div>
    </div>
  );
}
