import React, { useState } from 'react';
import css from './index.module.scss';

interface TaskProps {
  result: {
    name: string;
    solved: boolean;
    id: number;
    text: string;
    createdTime: string;
    executionPeriod: string;
    importance: number;
  };
}

export const Task: React.FC<TaskProps> = (props) => {
  let { name, id, solved, text, createdTime, executionPeriod, importance } =
    props.result;
  const [solvedState, setSolvedState] = useState(solved);
  console.info(id, createdTime, executionPeriod);
  const setImportanceStyle = () => {
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
        console.error(
          'Importance must be between 0-3. The value is not between 0 and 3. Default value set (regular)'
        );
        return css.regular;

        break;
    }
  };
  const setSolvedStyle = () => {
    switch (solvedState) {
      case true:
        return css.solved;
        break;
      case false:
        return css.unsolved;
        break;
      default:
        console.error('Parameter "solved" must have a boolean type');
        return <h1>Error: parameter "solved" must have a boolean type.</h1>;

        break;
    }
  };

  const toggleSolve = () => {
    setSolvedState(!solvedState);
    setSolvedStyle();
  };

  return (
    <div className={css.taskWrapper}>
      <li className={css.task}>
        <h3
          className={`${css.taskTitle} ${setImportanceStyle()} ${setSolvedStyle()}`}
          onClick={toggleSolve}
        >
          {name}
        </h3>
        <span className={css.taskText}>{text}</span>
      </li>
    </div>
  );
};
