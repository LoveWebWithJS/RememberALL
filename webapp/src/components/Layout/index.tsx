import { Link, Outlet } from 'react-router-dom';
import { getAddNewTaskRoute, getDoEverythingPageRoute } from '../../lib/routes';
import { Button } from '../Button';
import css from './index.module.scss';

export const Layout = () => {
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
          <Button
            text='Войти'
            btnStyle='mediumGreen'
            onClick={() => {
              console.log('clicked!');
            }}
          ></Button>
          <Button
            text='Зарегаться'
            btnStyle='mediumGreen'
            onClick={() => {
              console.log('clicked!');
            }}
          ></Button>
        </div>
      </nav>
      <div className={css.actionBar}>
        <Button
          btnStyle='darkGreen'
          onClick={() => {
            console.log('clicked!');
          }}
        >
          <Link to={getAddNewTaskRoute()}>+ Задача</Link>
        </Button>

        <span className={css.author}>Made by Melnikovsky with &lt;3</span>
      </div>
      <div className={css.outlet}>
        <Outlet />
      </div>
    </div>

    // <div className={css.layout}>
    //   <header className={css.header}>
    //     <h1 className={css.title}>
    //       Помни и <Link to={getDoEverythingPageRoute()}>делай</Link> всё
    //     </h1>
    //   </header>
    //   <Outlet />
    // </div>
  );
};
