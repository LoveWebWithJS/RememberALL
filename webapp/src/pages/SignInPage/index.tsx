import { Button } from '../../components/Button';
import { useFormik } from 'formik';
import css from './index.module.scss';
// import { z } from 'zod';
import { Input } from '../../components/Input';
import { withZodSchema } from 'formik-validator-zod';
import { trpc } from '../../lib/trpc';
import { zSignInTrpcInput } from '../../../../backend/src/router/signIn/input';

export const SignInPage = () => {
  const signUp = trpc.signIn.useMutation();
  const formik = useFormik({
    initialValues: {
      nick: '',
      password: '',
    },
    validate: withZodSchema(zSignInTrpcInput),
    onSubmit: async (values) => {
      await signUp.mutateAsync(values);
      formik.resetForm();
    },
  });
  return (
    <div className={css.AddNewTask}>
      <h2>Войти</h2>
      <form
        className={css.form}
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
      >
        <Input
          name='nick'
          className={css.nickWrapper}
          formik={formik}
          placeholder='Логин'
        />
        <Input
          name='password'
          type='password'
          className={css.passwordWrapper}
          formik={formik}
          placeholder='Пароль'
        />
        {/* //TODO: сделать ссылку для перехода на страницу Sign Up*/}
        {/* //TODO: ловить ошибки*/}
        <Button
          disabled={formik.isSubmitting}
          width='80%'
          text={formik.isSubmitting ? 'Авторизация...' : 'Войти'}
          type='submit'
          btnStyle='mediumGreen'
        ></Button>
      </form>
    </div>
  );
};
