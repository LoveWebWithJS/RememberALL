import { useNavigate, useParams } from 'react-router-dom';
import css from './index.module.scss';
import {
  getDoEverythingPageRoute,
  type EditTaskRouteParams,
} from '../../lib/routes';
import { trpc } from '../../lib/trpc';
import type { TrpcRouterOutput } from '../../../../backend/src/router';
import { useState } from 'react';
import { useFormik } from 'formik';
import { zUpdateTaskTrpcInput } from '../../../../backend/src/router/updateTask/input';
import { withZodSchema } from 'formik-validator-zod';
import { pick } from 'lodash';
import { Input } from '../../components/Input';
import { Textarea } from '../../components/Textarea';
import { Fieldset } from '../../components/Fieldset/index.module';
import { Button } from '../../components/Button';

const EditTaskComponent = ({
  task,
}: {
  task: NonNullable<TrpcRouterOutput['getTask']['task']>;
}) => {
  const navigate = useNavigate();
  const [, setSubmittingError] = useState<string | null>(null);
  const updateTask = trpc.updateTask.useMutation();
  const formik = useFormik({
    initialValues: pick(task, ['name', 'text', 'importance', 'solved']),
    validate: withZodSchema(zUpdateTaskTrpcInput.omit({ taskId: true })),
    onSubmit: async (values) => {
      try {
        setSubmittingError(null);
        await updateTask.mutateAsync({ taskId: task.id, ...values });
        navigate(getDoEverythingPageRoute());
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setSubmittingError(error.message);
      }
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
