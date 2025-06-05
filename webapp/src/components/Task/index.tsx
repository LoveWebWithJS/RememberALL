import React from 'react';
import css from './index.module.scss';

interface TaskProps {
  result: {
    name: string;
    id: number;
    text: string;
    createdTime: string;
    executionPeriod: string;
    importance: number;
  };
}

export const Task: React.FC<TaskProps> = (props) => {
  const { name, id, text, createdTime, executionPeriod, importance } = props.result;
  console.log(id);
  const setImportance = () => {
    switch (importance) {
      case 0:
        return css.thin;
        break;
      case 1:
        return css.regular;
        break;
      case 2:
        return css.medium;
        break;
      case 3:
        return css.bold;
        break;
      default:
        console.error('Importance must be between 0-3. The value is not between 0 and 3');
        return css.regular;

        break;
    }
  };

  return (
    <div className={css.taskWrapper}>
      <li className={css.task}>
        <h3 className={`${css.taskTitle} ${setImportance()}`}>{name}</h3>
        <span className={css.taskText}>
          {text} {createdTime} {executionPeriod} {importance}
        </span>
      </li>
    </div>
  );
};
