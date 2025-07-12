import { Button } from '../../components/Button';
import { useFormik } from 'formik';
import css from './index.module.scss';
import { Input } from '../../components/Input';
import { Textarea } from '../../components/Textarea';
import { Fieldset } from '../../components/Fieldset/index.module';
export const AddNewTask = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      text: '',
      importance: '',
    },
    onSubmit: (values) => {
      console.info('Submitted', values);
    },
  });
  const importancesArr = [
    { name: 'Крайне важная', value: 3 },
    { name: 'Важная', value: 2 },
    { name: 'Обычная', value: 1 },
    { name: 'Не важная', value: 0 },
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
          width='80%'
          text='Добавить'
          type='submit'
          btnStyle='mediumGreen'
        ></Button>
      </form>
    </div>
  );
};
