import React from 'react';
import css from './index.module.scss';

interface ButtonProps {
  title: string | number | undefined;
}

export const Button: React.FC<ButtonProps> = (props) => {
  return <button className={css.button}>{props.title}</button>;
};
