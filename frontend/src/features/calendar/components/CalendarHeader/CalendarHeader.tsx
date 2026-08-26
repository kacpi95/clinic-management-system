import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';

import styles from './CalendarHeader.module.scss';
import type { CalendarHeaderProps } from '../../types/calendarHeader.types';

export default function CalendarHeader({
  currentDate,
  onPrevious,
  onNext,
}: CalendarHeaderProps) {
  const formattedDate = currentDate.toLocaleDateString('pl-PL', {
    month: 'long',
    year: 'numeric',
  });

  const capitalizedDate =
    formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

  return (
    <header className={styles.wrapper}>
      <div className={styles.content}>
        <p className={styles.eyebrow}>Zarządzaj wizytami i harmonogramem</p>
        <h2 className={styles.title}>HARMONOGRAM</h2>
      </div>
      <div className={styles.navigation}>
        <button
          type='button'
          className={styles.arrowButton}
          onClick={onPrevious}
          aria-label='Poprzedni miesiąc'
        >
          <HiChevronLeft />
        </button>
        <h2 className={styles.month}>{capitalizedDate}</h2>
        <button
          type='button'
          className={styles.arrowButton}
          onClick={onNext}
          aria-label='Następny miesiąc'
        >
          <HiChevronRight />
        </button>
      </div>
    </header>
  );
}
