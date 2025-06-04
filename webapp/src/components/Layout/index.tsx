import { Link, Outlet } from 'react-router-dom';
import { getDoEverythingPageRoute } from '../../lib/routes';
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
            <Button name='today' role='filter'></Button>
            <Button name='tomorrow' role='filter'></Button>
            <Button name='week' role='filter'></Button>
          </div>
          <div className={css.bottomBtns}>
            <Button name='month' role='filter'></Button>
            <Button name='anyTime' role='filter'></Button>
          </div>
        </div>
        <div className={css.actionBtns}>
          <Button name='settings' role='settings'></Button>
          <Button name='auth' role='auth'></Button>
          <Button name='registration' role='reg'></Button>
        </div>
      </nav>
      <div className={css.actionBar}>
        <Button name='addTask' role='addNewTask'></Button>
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
