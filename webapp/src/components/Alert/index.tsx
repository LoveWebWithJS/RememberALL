import { type ReactNode } from 'react';
import { setAlertStyle } from './setAlertStyle';

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
    <div className={setAlertStyle(color)}>{children || <p>{innerText}</p>}</div>
  );
};
