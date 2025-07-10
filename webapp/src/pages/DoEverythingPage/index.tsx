// import { Link } from 'react-router-dom';
import { trpc } from '../../lib/trpc';
import css from './index.module.scss';
import { Task } from '../../components/Task';

interface TaskBackend {
  name: string;
  solved: boolean;
  id: number;
  text: string;
  createdTime: string;
  executionPeriod: string;
  importance: number;
}

export const DoEverythingPage = () => {
  const result = trpc.getTodayTasks.useQuery();
  const { isLoading, isFetching, isError, error } = result;

  if (isLoading || isFetching) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  if (result.data === undefined) {
    console.error('Requaired data is undefined');
    return <p>Requaired data is undefined. Something went wrong</p>;
  }

  result.data.sort((a: any, b: any) => (a.importance < b.importance ? 1 : -1));

  return (
    <div className={css.DoEverythingPage}>
      <div className={css.subtitleWrapper}>
        <h2 className={css.subtitle}>На сегодня у нас:</h2>
      </div>
      <div className={css.tasksWrapper}>
        <ul className={css.tasks}>
          {result.data.map((task: TaskBackend, i: number) => (
            <Task key={task.id} result={result.data[i]} />
          ))}
        </ul>
      </div>
    </div>
  );
};
