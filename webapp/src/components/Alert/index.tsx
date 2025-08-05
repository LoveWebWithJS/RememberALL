import { type ReactNode } from 'react';
import css from './index.module.scss';

export type AlertProps = {
  color: 'green' | 'blue' | 'red';
  innerText?: string;
  children?: ReactNode;
  hidden?: boolean;
};

export const Alert = ({ color, children, innerText, hidden }: AlertProps) => {
  if (hidden) {
    return null;
  }
  return (
    <div className={`${css.alertWrapper} ${css.color}`}>
      {children || <p>{innerText}</p>}
    </div>
  );
};
