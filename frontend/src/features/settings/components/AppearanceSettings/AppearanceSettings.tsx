import { FaRegMoon } from 'react-icons/fa';
import { IoSunnyOutline } from 'react-icons/io5';

import styles from './AppearanceSettings.module.scss';
import { useTheme } from '../../../../context/useTheme';

export default function AppearanceSettings() {
  const { theme, setTheme } = useTheme();

  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <h2 className={styles.title}>Wygląd i język</h2>
        <p>Dostosuj wygląd aplikacji do swoich preferencji.</p>
      </div>

      <div className={styles.actions}>
        <div className={styles.setting}>
          <div>
            <h3>Motyw</h3>
            <p>Wybierz wygląd interfejsu.</p>
          </div>

          <div className={styles.themeOptions}>
            <button
              type='button'
              className={theme === 'light' ? styles.active : ''}
              onClick={() => setTheme('light')}
            >
              <IoSunnyOutline />
              Jasny
            </button>

            <button
              type='button'
              className={theme === 'dark' ? styles.active : ''}
              onClick={() => setTheme('dark')}
            >
              <FaRegMoon />
              Ciemny
            </button>
          </div>
        </div>

        <div className={styles.setting}>
          <div>
            <h3>Język</h3>
            <p>Wybierz język aplikacji.</p>
          </div>

          <select defaultValue='pl'>
            <option value='pl'>Polski</option>
            <option value='en'>English</option>
            <option value='de'>Deutsch</option>
          </select>
        </div>
      </div>
    </section>
  );
}
