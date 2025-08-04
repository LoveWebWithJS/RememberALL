/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '../../components/Button';
import css from './index.module.scss';
import Cookies from 'js-cookie';
import { z } from 'zod';
import { Input } from '../../components/Input';
import { trpc } from '../../lib/trpc';
import { zSignUpTrpcInput } from '../../../../backend/src/router/signUp/input';
import { getDoEverythingPageRoute, getSignInRoute } from '../../lib/routes';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from '../../lib/form';

export const SignUpPage = () => {
  const navigate = useNavigate();
  const trpcUtils = trpc.useUtils();
  const signUp = trpc.signUp.useMutation();
  const { formik } = useForm({
    initialValues: {
      nick: '',
      password: '',
      passwordAgain: '',
    },
    validationSchema: zSignUpTrpcInput
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
      }),
    onSubmit: async (values) => {
      const { token } = await signUp.mutateAsync(values);
      Cookies.set('token', token, { expires: 999 });
      void trpcUtils.invalidate();
      navigate(getDoEverythingPageRoute());
    },
  });
  return (
    <div className={css.SignUpWrapper}>
      <div className={css.SignUp}>
        <h1>Зарегистрироваться</h1>
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
          <Link to={getSignInRoute()} className={css.SignUpLink}>
            <p>У вас уже есть аккаунт?</p>
          </Link>
          <Button
            disabled={formik.isSubmitting}
            width='80%'
            text={formik.isSubmitting ? 'Создание...' : 'Создать аккаунт'}
            type='submit'
            btnStyle='mediumGreen'
          ></Button>
        </form>
      </div>
    </div>
  );
};
