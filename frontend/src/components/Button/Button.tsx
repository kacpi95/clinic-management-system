import type { ReactNode } from 'react';

import styles from './Button.module.scss';

interface Props {
  children: ReactNode;
  type: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

export default function Button({ children, type = 'button', onClick }: Props) {
  return (
    <button type={type} className={`${styles.button}`} onClick={onClick}>
      {children}
    </button>
  );
}
