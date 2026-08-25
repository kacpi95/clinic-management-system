import AppearanceSettings from '../../features/settings/components/AppearanceSettings/AppearanceSettings';
import ProfileSettings from '../../features/settings/components/ProfileSettings/ProfileSettings';
import SecuritySettings from '../../features/settings/components/SecuritySettings/SecuritySettings';
import SettingsHeader from '../../features/settings/components/SettingsHeader/SettingsHeader';
import styles from './Settings.module.scss';

export default function Settings() {
  return (
    <div className={styles.wrapper}>
      <SettingsHeader />
      <ProfileSettings />
      <div className={styles.grid}>
        <AppearanceSettings />
        <SecuritySettings />
      </div>
    </div>
  );
}
