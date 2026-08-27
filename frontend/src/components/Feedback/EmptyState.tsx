import styles from './FeedbackState.module.scss';

type Props = {
  title?: string;
  message?: string;
};

export default function EmptyState({
  title = 'Brak danych',
  message = 'Nie znaleziono żadnych elementów do wyświetlenia.',
}: Props) {
  return (
    <div className={styles.wrapper}>
      <strong>{title}</strong>
      <p>{message}</p>
    </div>
  );
}
