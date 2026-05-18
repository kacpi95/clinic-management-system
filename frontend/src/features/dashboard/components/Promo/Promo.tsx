import styles from './Promo.module.scss';

export default function Promo() {
  return (
    <article className={styles.promoCard}>
      <div className={styles.overlay} />

      <div className={styles.promoContent}>
        <p className={styles.promoEyebrow}>STATUS SYSTEMU</p>
        <h3>Wszystkie systemy działają poprawnie.</h3>
        <span>Ostatnia synchronizacja 2 min temu</span>
      </div>
    </article>
  );
}
