import { Button } from '../../components/Button';
import { useFormik } from 'formik';
import css from './index.module.scss';
import { Input } from '../../components/Input';
import { Textarea } from '../../components/Textarea';
import { Fieldset } from '../../components/Fieldset/index.module';
import { withZodSchema } from 'formik-validator-zod';
// import { z } from 'zod';
import { trpc } from '../../lib/trpc';
import { useNavigate } from 'react-router-dom';
import { zCreateNewTaskTrpcInput } from '../../../../backend/src/router/createNewTask/input';
import { getDoEverythingPageRoute } from '../../lib/routes';
export const AddNewTask = () => {
  const navigate = useNavigate();
  const createTask = trpc.createNewTask.useMutation();
  const formik = useFormik({
    initialValues: {
      name: '',
      text: '',
      importance: '0',
      solved: false,
      // id: '',
    },
    validate: withZodSchema(zCreateNewTaskTrpcInput),
    onSubmit: async (values) => {
      await createTask.mutateAsync(values);
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
    <div className={css.AddNewTask}>
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
          text={formik.isSubmitting ? 'Создание...' : 'Добавить'}
          type='submit'
          btnStyle='mediumGreen'
        ></Button>
      </form>
    </div>
  );
};
