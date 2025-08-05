import { Button } from '../../components/Button';
import css from './index.module.scss';
import Cookies from 'js-cookie';
import { Input } from '../../components/Input';
import { trpc } from '../../lib/trpc';
import { zSignInTrpcInput } from '../../../../backend/src/router/signIn/input';
import { getDoEverythingPageRoute, getSignUpRoute } from '../../lib/routes';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from '../../lib/form';
import { Alert } from '../../components/Alert';

export const SignInPage = () => {
  const navigate = useNavigate();
  const trpcUtils = trpc.useUtils();
  const signUp = trpc.signIn.useMutation();
  const { formik, alertProps } = useForm({
    initialValues: {
      nick: '',
      password: '',
    },
    validationSchema: zSignInTrpcInput,
    onSubmit: async (values) => {
      const { token } = await signUp.mutateAsync(values);
      Cookies.set('token', token, { expires: 999 });
      void trpcUtils.invalidate();
      navigate(getDoEverythingPageRoute());
    },
    showValidationAlert: true,
  });
  return (
    <div className={css.LogInWrapper}>
      <div className={css.LogIn}>
        <h1>Войти</h1>
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
          <Link to={getSignUpRoute()} className={css.SignInLink}>
            У вас ещё нет аккаунта?
          </Link>
          <Alert {...alertProps}></Alert>
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
