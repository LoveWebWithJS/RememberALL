import { useNavigate, useParams } from 'react-router-dom';
import css from './index.module.scss';
import {
  getDoEverythingPageRoute,
  type EditTaskRouteParams,
} from '../../lib/routes';
import { trpc } from '../../lib/trpc';
import type { TrpcRouterOutput } from '../../../../backend/src/router';
import { zUpdateTaskTrpcInput } from '../../../../backend/src/router/updateTask/input';
import { pick } from 'lodash';
import { Input } from '../../components/Input';
import { Textarea } from '../../components/Textarea';
import { Fieldset } from '../../components/Fieldset/index.module';
import { Button } from '../../components/Button';
import { useForm } from '../../lib/form';

const EditTaskComponent = ({
  task,
}: {
  task: NonNullable<TrpcRouterOutput['getTask']['task']>;
}) => {
  const navigate = useNavigate();
  const updateTask = trpc.updateTask.useMutation();
  const { formik } = useForm({
    initialValues: pick(task, ['name', 'text', 'importance', 'solved']),
    validationSchema: zUpdateTaskTrpcInput.omit({ taskId: true }),
    onSubmit: async (values) => {
      await updateTask.mutateAsync({ taskId: task.id, ...values });
      navigate(getDoEverythingPageRoute());
    },
  });
  const importancesArr = [
    { name: 'Крайне важная', value: '3' },
    { name: 'Важная', value: '2' },
    { name: 'Обычная', value: '1' },
    { name: 'Не важная', value: '0' },
  ];
  return (
    <div className={css.EditTaskPage}>
      <form
        className={css.form}
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
      >
        <Input
          labelText='Название'
          name='name'
          className={css.nameWrapper}
          formik={formik}
          placeholder='Как бы Вы назвали эту задачу?'
        />
        <Textarea
          labelText='Текст'
          name='text'
          className={css.textWrapper}
          formik={formik}
          placeholder='Как бы Вы описали эту задачу?'
        />
        <Fieldset
          legend='Важность задачи'
          name='importance'
          className={css.importanceWrapper}
          inputsArr={importancesArr}
          formik={formik}
        />
        <Button
          disabled={formik.isSubmitting}
          width='80%'
          text={formik.isSubmitting ? 'Создание...' : 'Изменить'}
          type='submit'
          btnStyle='mediumGreen'
        ></Button>
      </form>
    </div>
  );
};

export const EditTaskPage = () => {
  const getMeResult = trpc.getMe.useQuery();
  const { id } = useParams() as EditTaskRouteParams;
  const getTaskResult = trpc.getTask.useQuery({
    userId: getMeResult.data?.me?.id || 'a',
    id: id,
  });
  console.log('Edit task page yoo');
  if (
    getTaskResult.isLoading ||
    getTaskResult.isFetching ||
    getMeResult.isLoading ||
    getMeResult.isFetching
  ) {
    return <span>Loading... Please wait...</span>;
  }
  if (getTaskResult.isError) {
    return <span>Error: {getTaskResult.error.message}</span>;
  }
  if (getMeResult.isError) {
    return <span>Error: {getMeResult.error.message}</span>;
  }
  if (!getTaskResult.data?.task) {
    return <span>Task not found</span>;
  }
  const me = getMeResult?.data?.me;
  if (!me) {
    return <span>Only for authorized</span>;
  }
  const task = getTaskResult.data.task;
  if (me.id !== task.userId) {
    return <span>No permissions</span>;
  }

  return <EditTaskComponent task={task} />;
};
