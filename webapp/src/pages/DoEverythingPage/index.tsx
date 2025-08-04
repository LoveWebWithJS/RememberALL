import { trpc } from '../../lib/trpc';
import css from './index.module.scss';
import { Task } from '../../components/Task';

interface TaskBackend {
  name: string;
  solved: boolean;
  id: string;
  text: string;
  importance: string;
}

export const DoEverythingPage = () => {
  const getMeResult = trpc.getMe.useQuery();
  const getTasksResult = trpc.getTasks.useQuery({
    userId: getMeResult.data?.me?.id || 'a',
  });

  if (
    getTasksResult.isLoading ||
    getTasksResult.isFetching ||
    getMeResult.isLoading ||
    getMeResult.isFetching
  ) {
    return <span>Loading...</span>;
  }

  if (getTasksResult.isError) {
    return <span>Error: {getTasksResult.error.message}</span>;
  }
  if (getTasksResult.data === undefined) {
    console.error('Requaired data is undefined');
    return <p>Requaired data is undefined. Something went wrong</p>;
  }

  getTasksResult.data.tasks.sort((a: TaskBackend, b: TaskBackend) =>
    a.importance < b.importance ? 1 : -1
  );
  if (getMeResult.data?.me?.id == undefined) {
    return (
      <div className={css.DoEverythingPage}>
        <div className={css.tasksWrapper}>
          <h1 className={css.authorizathionAlert}>
            Пожалуйста, авторизуйтесь или войдите чтобы создавать задачи и
            видеть собственные задачи
          </h1>
        </div>
      </div>
    );
  }
  return (
    <div className={css.DoEverythingPage}>
      <div className={css.subtitleWrapper}>
        <h2 className={css.subtitle}>На сегодня у нас:</h2>
      </div>
      <div className={css.tasksWrapper}>
        <ul className={css.tasks}>
          {getTasksResult.data.tasks.map((task: TaskBackend, i: number) => (
            <Task key={task.id} result={getTasksResult.data.tasks[i]} />
          ))}
        </ul>
      </div>
    </div>
  );
};
