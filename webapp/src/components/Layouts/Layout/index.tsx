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
// import { trpc } from '../../../lib/trpc';
import { useMe } from '../../../lib/ctx';

export const Layout = () => {
  const me = useMe();
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
          {me ? (
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
        {me == null ? null : me ? (
          <>
            <LinkButton
              to={getAddNewTaskRoute()}
              text='+ Задача'
              btnStyle='darkGreen'
            />
            <Button
              text='Синхронизовать задачи'
              btnStyle='sync'
              onClick={() => {
                console.log('clicked!');
              }}
            ></Button>
          </>
        ) : (
          <>
            <LinkButton
              to={getAddNewTaskRoute()}
              text='+ Задача'
              btnStyle='darkGreen'
              disabled={true}
            />
            <Button
              text='Синхронизовать задачи'
              btnStyle='sync'
              onClick={() => {
                console.log('Тут будет функционал синхронизации...');
              }}
              disabled={true}
            ></Button>
          </>
        )}

        <span className={css.author}>Made by Melnikovsky with &lt;3</span>
      </div>
      <div className={css.outlet}>
        <Outlet />
      </div>
    </div>
  );
};
