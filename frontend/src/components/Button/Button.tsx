import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  type: 'button' | 'submit' | 'reset';
  className?: string;
  onClick?: () => void;
}

export default function Button({
  children,
  type = 'button',
  onClick,
  className,
}: Props) {
  return (
    <button type={type} className={className} onClick={onClick}>
      {children}
    </button>
  );
}
