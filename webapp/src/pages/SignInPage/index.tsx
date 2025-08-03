import { Button } from '../../components/Button';
import { useFormik } from 'formik';
import css from './index.module.scss';
import Cookies from 'js-cookie';
import { Input } from '../../components/Input';
import { withZodSchema } from 'formik-validator-zod';
import { trpc } from '../../lib/trpc';
import { zSignInTrpcInput } from '../../../../backend/src/router/signIn/input';
import { getDoEverythingPageRoute, getSignUpRoute } from '../../lib/routes';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const SignInPage = () => {
  const navigate = useNavigate();
  const trpcUtils = trpc.useUtils();
  const signUp = trpc.signIn.useMutation();
  const [submittingError, setSubmittingError] = useState<string | null>(null);
  const formik = useFormik({
    initialValues: {
      nick: '',
      password: '',
    },
    validate: withZodSchema(zSignInTrpcInput),
    onSubmit: async (values) => {
      try {
        const { token } = await signUp.mutateAsync(values);
        Cookies.set('token', token, { expires: 999 });
        void trpcUtils.invalidate();
        navigate(getDoEverythingPageRoute());
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setSubmittingError(error.message);
      }
    },
  });
  return (
    <div className={css.LogInWrapper}>
      <div className={css.LogIn}>
        <h1>Войти</h1>
        <form
          className={css.form}
          onSubmit={(e) => {
            e.preventDefault();
            setSubmittingError(null);
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
          <Link to={getSignUpRoute()} className={css.SignInLink}>
            У вас ещё нет аккаунта?
          </Link>
          {submittingError && (
            <>
              <br /> <span color='red'>{submittingError}</span>
            </>
          )}
          <Button
            disabled={formik.isSubmitting}
            width='80%'
            text={formik.isSubmitting ? 'Авторизация...' : 'Войти'}
            type='submit'
            btnStyle='mediumGreen'
          ></Button>
        </form>
      </div>
    </div>
  );
};
