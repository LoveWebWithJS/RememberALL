import { trpc } from '../../lib/trpc';
import css from './index.module.scss';
import { Task } from '../../components/Task';
import { useMe } from '../../lib/ctx';
import { withPageWrapper } from '../../lib/pageWrapper';

type TaskBackend = {
  name: string;
  solved: boolean;
  id: string;
  text: string;
  importance: string;
};

export const DoEverythingPage = withPageWrapper({
  // authorizedOnly: true,
  useQuery: () => {
    const me = useMe();
    return trpc.getTasks.useQuery({
      userId: me?.id || '0',
    });
  },
  setProps: ({ queryResult, checkExists, ctx }) => {
    const me = ctx.me;
    const tasks = checkExists(
      queryResult.data?.tasks,
      'Tasks not found (something went wrong)'
    );
    return { tasks, me };
  },
})(({ tasks, me }) => {
  tasks.sort((a: TaskBackend, b: TaskBackend) =>
    a.importance < b.importance ? 1 : -1
  );
  if (me == null) {
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
          {tasks.map((task: TaskBackend, i: number) => (
            <Task key={task.id} result={tasks[i]} />
          ))}
        </ul>
      </div>
    </div>
  );
});
