import React from 'react';
import css from './index.module.scss';

interface ButtonProps {
  name: string;
  role?: string;
}

export const Button: React.FC<ButtonProps> = ({ name, role }) => {
  console.log(name, role);
  switch (name) {
    case 'today':
      return <button className={css.button}>Сегодня</button>;
      break;
    case 'tomorrow':
      return <button className={css.button}>Завтра</button>;
      break;
    case 'week':
      return <button className={css.button}>На неделе</button>;
      break;
    case 'month':
      return <button className={css.button}>В этот месяц</button>;
      break;
    case 'anyTime':
      return <button className={css.button}>Хз когда</button>;
      break;
    case 'settings':
      return <button className={`${css.button} ${css.dark}`}>Настройки</button>;
      break;
    case 'auth':
      return <button className={`${css.button} ${css.dark}`}>Войти</button>;
      break;
    case 'registration':
      return <button className={`${css.button} ${css.dark}`}>Зарегаться</button>;
      break;
    case 'addTask':
      return <button className={`${css.button} ${css.extraDark}`}>+ Задача</button>;
      break;
    default:
      return <button className={css.button}>Кнопка</button>;
      break;
  }
};
//
//
//
//
