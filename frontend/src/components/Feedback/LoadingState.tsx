import styles from './FeedbackState.module.scss';

type Props = {
  message?: string;
};

export default function LoadingState({
  message = 'Ładowanie danych...',
}: Props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.spinner} />
      <p>{message}</p>
    </div>
  );
}
