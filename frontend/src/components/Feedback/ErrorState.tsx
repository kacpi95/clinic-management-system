import styles from './FeedbackState.module.scss';

type Props = {
  message?: string;
};

export default function ErrorState({
  message = 'Nie udało się załadować danych.',
}: Props) {
  return (
    <div className={`${styles.wrapper} ${styles.error}`}>
      <strong>Wystąpił błąd</strong>
      <p>{message}</p>
    </div>
  );
}
