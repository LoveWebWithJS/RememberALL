// import { Link } from 'react-router-dom';
import { trpc } from '../../lib/trpc';
import css from './index.module.scss';
// import { getSettingsPageRoute } from '../../lib/routes';

export const DoEverythingPage = () => {
  const { error, isLoading, isFetching, isError } = trpc.getPong.useQuery();
  if (isLoading || isFetching) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className={css.DoEverythingPage}>
      <div className={css.subtitleWrapper}>
        <h2 className={css.subtitle}>На сегодня у нас:</h2>
      </div>
      <div className={css.taskWrapper}>
        <ul className={css.tasks}>
          <li className={css.task}>
            <span className={css.taskText}>Съешь ещё этих мягких французских булок да выпей чаю.</span>
          </li>
          <li className={css.task}>
            <span className={css.taskText}>Съешь ещё этих мягких французских булок да выпей чаю.</span>
          </li>
          <li className={css.task}>
            <span className={css.taskText}>Съешь ещё этих мягких французских булок да выпей чаю.</span>
          </li>
          <li className={css.task}>
            <span className={css.taskText}>Съешь ещё этих мягких французских булок да выпей чаю.</span>
          </li>
          <li className={css.task}>
            <span className={css.taskText}>Съешь ещё этих мягких французских булок да выпей чаю.</span>
          </li>
          <li className={css.task}>
            <span className={css.taskText}>Съешь ещё этих мягких французских булок да выпей чаю.</span>
          </li>
          <li className={css.task}>
            <span className={css.taskText}>Съешь ещё этих мягких французских булок да выпей чаю.</span>
          </li>
          <li className={css.task}>
            <span className={css.taskText}>Съешь ещё этих мягких французских булок да выпей чаю.</span>
          </li>
          <li className={css.task}>
            <span className={css.taskText}>Съешь ещё этих мягких французских булок да выпей чаю.</span>
          </li>
          <li className={css.task}>
            <span className={css.taskText}>Съешь ещё этих мягких французских булок да выпей чаю.</span>
          </li>
          <li className={css.task}>
            <span className={css.taskText}>Съешь ещё этих мягких французских булок да выпей чаю.</span>
          </li>
          <li className={css.task}>
            <span className={css.taskText}>Съешь ещё этих мягких французских булок да выпей чаю.</span>
          </li>
          <li className={css.task}>
            <span className={css.taskText}>Съешь ещё этих мягких французских булок да выпей чаю.</span>
          </li>
          <li className={css.task}>
            <span className={css.taskText}>Съешь ещё этих мягких французских булок да выпей чаю.</span>
          </li>
          <li className={css.task}>
            <span className={css.taskText}>Съешь ещё этих мягких французских булок да выпей чаю.</span>
          </li>
          <li className={css.task}>
            <span className={css.taskText}>Съешь ещё этих мягких французских булок да выпей чаю.</span>
          </li>
          <li className={css.task}>
            <span className={css.taskText}>Съешь ещё этих мягких французских булок да выпей чаю.</span>
          </li>
          <li className={css.task}>
            <span className={css.taskText}>Съешь ещё этих мягких французских булок да выпей чаю.</span>
          </li>
          <li className={css.task}>
            <span className={css.taskText}>Съешь ещё этих мягких французских булок да выпей чаю.</span>
          </li>
          <li className={css.task}>
            <span className={css.taskText}>Съешь ещё этих мягких французских булок да выпей чаю.</span>
          </li>
          <li className={css.task}>
            <span className={css.taskText}>Съешь ещё этих мягких французских булок да выпей чаю.</span>
          </li>
          <li className={css.task}>
            <span className={css.taskText}>Съешь ещё этих мягких французских булок да выпей чаю.</span>
          </li>
          <li className={css.task}>
            <span className={css.taskText}>Съешь ещё этих мягких французских булок да выпей чаю.</span>
          </li>
          <li className={css.task}>
            <span className={css.taskText}>Съешь ещё этих мягких французских булок да выпей чаю.</span>
          </li>
          <li className={css.task}>
            <span className={css.taskText}>Съешь ещё этих мягких французских булок да выпей чаю.</span>
          </li>
          <li className={css.task}>
            <span className={css.taskText}>Съешь ещё этих мягких французских булок да выпей чаю.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
