import { Link, Outlet } from 'react-router-dom';
import { getDoEverythingPageRoute } from '../../lib/routes';
// import { Button } from '../Button';
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
            {/* <Button title='Сегодня'></Button> */}
            <button className={css.today}>Сегодня</button>
            <button className={css.tomorrow}>Завтра</button>
            <button className={css.week}>На неделе</button>
          </div>
          <div className={css.bottomBtns}>
            <button className={css.month}>В этот месяц</button>
            <button className={css.anyTime}>Хз когда</button>
          </div>
        </div>
        <div className={css.actionBtns}>
          <button className={css.settings}>Настройки</button>
          <button className={css.auth}>Войти</button>
          <button className={css.registration}>Зарегаться</button>
        </div>
      </nav>
      <div className={css.actionBar}>
        <button className={css.newTask}>+ Задача</button>
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
