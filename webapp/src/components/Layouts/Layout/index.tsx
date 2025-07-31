import { Link, Outlet } from 'react-router-dom';
import {
  getAddNewTaskRoute,
  getDoEverythingPageRoute,
  getSignInRoute,
  getSignOutRoute,
  getSignUpRoute,
} from '../../../lib/routes';
import { Button, LinkButton } from '../../Button';
import css from './index.module.scss';
import { trpc } from '../../../lib/trpc';

export const Layout = () => {
  const { data, isLoading, isFetching, isError } = trpc.getMe.useQuery();
  return (
    <div className={css.layout}>
      <header className={css.header}>
        <h1 className={css.title}>
          Помни и <Link to={getDoEverythingPageRoute()}>делай</Link> всё
        </h1>
      </header>
      <nav className={css.navigation}>
        <div className={css.filterBtns}>
          <div className={css.topBtns}>
            <Button
              text='Сегодня'
              btnStyle='lightGreen'
              onClick={() => {
                console.log('clicked!');
              }}
            ></Button>
            <Button
              text='Завтра'
              btnStyle='lightGreen'
              onClick={() => {
                console.log('clicked!');
              }}
            ></Button>
            <Button
              text='На неделе'
              btnStyle='lightGreen'
              onClick={() => {
                console.log('clicked!');
              }}
            ></Button>
          </div>
          <div className={css.bottomBtns}>
            <Button
              text='В этот месяц'
              btnStyle='lightGreen'
              onClick={() => {
                console.log('clicked!');
              }}
            ></Button>
            <Button
              text='Когда-нибудь'
              btnStyle='lightGreen'
              onClick={() => {
                console.log('clicked!');
              }}
            ></Button>
          </div>
        </div>
        <div className={css.actionBtns}>
          <Button
            text='Настройки'
            btnStyle='mediumGreen'
            onClick={() => {
              console.log('clicked!');
            }}
          ></Button>
          {isLoading || isFetching || isError ? null : data?.me ? ( //и че тут делать с этой датой если может быть undefined?
            <>
              <LinkButton
                to={getSignOutRoute()}
                text='Разлогинится'
                btnStyle='mediumGreen'
              />
            </>
          ) : (
            <>
              <LinkButton
                to={getSignInRoute()}
                text='Войти'
                btnStyle='mediumGreen'
              />
              <LinkButton
                to={getSignUpRoute()}
                text='Зарегаться'
                btnStyle='mediumGreen'
              />
            </>
          )}
        </div>
      </nav>
      <div className={css.actionBar}>
        <LinkButton
          to={getAddNewTaskRoute()}
          text='+ Задача'
          btnStyle='darkGreen'
        />
        {/* <Button
          btnStyle='darkGreen'
          onClick={() => {
            console.log('clicked!');
          }}
        >
          <Link to={getAddNewTaskRoute()}>+ Задача</Link>
        </Button> */}
        <Button
          text='Синхронизовать задачи'
          btnStyle='sync'
          onClick={() => {
            console.log('clicked!');
          }}
        ></Button>

        <span className={css.author}>Made by Melnikovsky with &lt;3</span>
      </div>
      <div className={css.outlet}>
        <Outlet />
      </div>
    </div>
  );
};
