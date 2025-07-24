import { Button } from '../../components/Button';
import { useFormik } from 'formik';
import css from './index.module.scss';
import { z } from 'zod';
import { Input } from '../../components/Input';
import { withZodSchema } from 'formik-validator-zod';
import { trpc } from '../../lib/trpc';
import { zSignUpTrpcInput } from '../../../../backend/src/router/signUp/input';

export const SignUpPage = () => {
  const signUp = trpc.signUp.useMutation();
  const formik = useFormik({
    initialValues: {
      nick: '',
      password: '',
      passwordAgain: '',
    },
    validate: withZodSchema(
      zSignUpTrpcInput
        .extend({
          passwordAgain: z.string().min(1),
        })
        .superRefine((val, ctx) => {
          if (val.password !== val.passwordAgain) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'Пароли должны быть одинаковы',
              path: ['passwordAgain'],
            });
          }
        })
    ),
    onSubmit: async (values) => {
      await signUp.mutateAsync(values);
      formik.resetForm();
    },
  });
  return (
    <div className={css.AddNewTask}>
      <h2>Зарегистрироваться</h2>
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
        <Input
          name='passwordAgain'
          type='password'
          className={css.passwordAgainWrapper}
          formik={formik}
          placeholder='И ещё разок пароль'
        />
        {/* //TODO: сделать ссылку для перехода на страницу Log In*/}
        <Button
          disabled={formik.isSubmitting}
          width='80%'
          text={formik.isSubmitting ? 'Создание...' : 'Создать аккаунт'}
          type='submit'
          btnStyle='mediumGreen'
        ></Button>
      </form>
    </div>
  );
};
