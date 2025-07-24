import { Link, Outlet } from 'react-router-dom';
import { getDoEverythingPageRoute } from '../../../lib/routes';
import css from './index.module.scss';

export const SimpleLayout = () => {
  return (
    <div className={css.layout}>
      <header className={css.header}>
        <h1 className={css.title}>
          Помни и <Link to={getDoEverythingPageRoute()}>делай</Link> всё
        </h1>
      </header>
      <div className={css.outlet}>
        <Outlet />
      </div>
    </div>
  );
};
