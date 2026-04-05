import styles from './Button.module.scss';

export default function Buttton({ children, type = 'button', onclick }) {
  return (
    <button type={type} className={`${styles.button}`} onClick={onclick}>
      {children}
    </button>
  );
}
