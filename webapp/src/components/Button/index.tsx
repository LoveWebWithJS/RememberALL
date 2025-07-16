import { type ReactNode } from 'react';
import css from './index.module.scss';

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
  const setBtnStyle = () => {
    //this function uses for adding css class for button. String which used in props also adds class for button. You can add your new class and write styles for it in css which imports in top
    switch (btnStyle) {
      //like:
      // case 'yourStringWhichUsedInProps':
      //   return css.yourClass;
      //   break;
      case 'sync':
        return css.sync;
        break;
      case 'ligthGreen':
        return css.lightGreen;
        break;
      case 'mediumGreen':
        return css.mediumGreen;
        break;
      case 'darkGreen':
        return css.darkGreen;
        break;
      default:
        return css.lightGreen;
        break;
    }
  };
  return (
    <button
      disabled={disabled || false}
      onClick={onClick}
      style={{ width: width }}
      type={type}
      className={`${setBtnStyle()}`}
    >
      {text || children}
    </button>
  );
};
