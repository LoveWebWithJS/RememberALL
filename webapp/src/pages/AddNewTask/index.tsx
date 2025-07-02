import { Button } from '../../components/Button';
import css from './index.module.scss';
import { useState } from 'react';

export const AddNewTask = () => {
  const [state, setState] = useState<{
    name: string;
    text: string;
    importance: number | null;
  }>({
    name: '',
    text: '',
    importance: null,
  });

  return (
    <div className={css.AddNewTask}>
      <form
        className={css.form}
        onSubmit={(e) => {
          e.preventDefault();
          console.info('Submitted', state);
        }}
      >
        <div className={css.nameWrapper}>
          <label htmlFor='name'>Название:</label>
          <input
            type='text'
            onChange={(e) => {
              setState({ ...state, name: e.target.value });
            }}
            value={state.name}
            name='name'
            id='name'
            autoComplete='off'
          />
        </div>
        <div className={css.textWrapper}>
          <label htmlFor='text'>Описание:</label>
          <textarea
            onChange={(e) => {
              setState({ ...state, text: e.target.value });
            }}
            value={state.text}
            name='text'
            id='text'
          />
        </div>
        <div className={css.importanceWrapper}>
          <label htmlFor='importance'>Степень значимости от 0 до 3</label>
          <input
            type='text'
            onChange={(e) => {
              if (Number.isNaN(Number(e.target.value))) {
                return console.error(
                  'Importance must be between 0 and 3 and has a number type. Returned value is: ' +
                    e.target.value
                );
              }
              setState({ ...state, importance: Number(e.target.value) });
            }}
            value={Number(state.importance)}
            name='importance'
            id='importance'
          />
        </div>

        {/* <Button text=''></Button> */}
      </form>
    </div>
  );
};
