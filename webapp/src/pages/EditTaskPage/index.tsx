import { useNavigate, useParams } from 'react-router-dom';
import css from './index.module.scss';
import {
  getDoEverythingPageRoute,
  type EditTaskRouteParams,
} from '../../lib/routes';
import { trpc } from '../../lib/trpc';
import { zUpdateTaskTrpcInput } from '../../../../backend/src/router/updateTask/input';
import { pick } from 'lodash';
import { Input } from '../../components/Input';
import { Textarea } from '../../components/Textarea';
import { Fieldset } from '../../components/Fieldset/index.module';
import { Button } from '../../components/Button';
import { useForm } from '../../lib/form';
import { Alert } from '../../components/Alert';
import { useMe } from '../../lib/ctx';
import { withPageWrapper } from '../../lib/pageWrapper';

export const EditTaskPage = withPageWrapper({
  authorizedOnly: true,
  useQuery: () => {
    const me = useMe();
    const { id } = useParams() as EditTaskRouteParams;
    return trpc.getTask.useQuery({
      userId: me?.id || 'a',
      id: id,
    });
  },
  // checkExists: ({ queryResult }) => !!queryResult?.data?.task, // old realization
  // checkExistsMessage: 'Task not found',
  // checkAccess: ({ queryResult, ctx }) =>
  //   !!ctx.me && ctx.me.id === queryResult.data?.task?.userId,
  // checkAccessMessage: 'No permission',
  setProps: ({ queryResult, ctx, checkExists, checkAccess }) => {
    const task = checkExists(queryResult.data?.task, 'Task not found');
    checkAccess(ctx.me?.id === task.userId, 'No permission');
    return { task };
  },
})(({ task }) => {
  const navigate = useNavigate();
  const updateTask = trpc.updateTask.useMutation();
  const { formik, alertProps } = useForm({
    initialValues: pick(task, ['name', 'text', 'importance', 'solved']),
    validationSchema: zUpdateTaskTrpcInput.omit({ taskId: true }),
    onSubmit: async (values) => {
      await updateTask.mutateAsync({ taskId: task.id, ...values });
      navigate(getDoEverythingPageRoute());
    },
    showValidationAlert: true,
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
        <Alert {...alertProps}></Alert>
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
});
