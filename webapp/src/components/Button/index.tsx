import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { setBtnStyle } from './setBtnStyle';

export const Button = ({
  disabled,
  onClick,
  text,
  width,
  btnStyle,
  children,
  type,
}: {
  disabled?: boolean;
  onClick?: () => void; //use function expression without returning value or you can use types union
  text?: string;
  width?: string;
  btnStyle?: string;
  children?: ReactNode;
  type?: 'submit' | 'reset' | 'button' | undefined;
}) => {
  return (
    <button
      disabled={disabled || false}
      onClick={onClick}
      style={{ width: width }}
      type={type}
      className={`${setBtnStyle(btnStyle)}`}
    >
      {text || children}
    </button>
  );
};

export const LinkButton = ({
  text,
  width,
  btnStyle,
  children,
  to,
  className,
}: {
  disabled?: boolean;
  text?: string;
  width?: string;
  btnStyle?: string;
  children?: ReactNode;
  to: string;
  className?: string;
}) => {
  return (
    <Link to={to} className={`${className}`}>
      <button className={`${setBtnStyle(btnStyle)}`} style={{ width: width }}>
        {text || children}
      </button>
    </Link>
  );
};
