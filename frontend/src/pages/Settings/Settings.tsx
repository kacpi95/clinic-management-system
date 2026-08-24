import ProfileSettings from '../../features/settings/components/ProfileSettings/ProfileSettings';
import SettingsHeader from '../../features/settings/components/SettingsHeader/SettingsHeader';
import styles from './Settings.module.scss';

export default function Settings() {
  return (
    <div className={styles.wrapper}>
      <SettingsHeader />
      <ProfileSettings/>
      <div className={styles.grid}></div>
    </div>
  );
}
