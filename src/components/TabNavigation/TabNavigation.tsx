import { NavLink } from 'react-router-dom';
import classes from './TabNavigation.module.scss';

type tab = {
  label: string;
  url: string;
};

interface IProps {
  tabs: tab[];
}

const TabNavigation = ({ tabs }: IProps) => {
  return (
    <div className={classes.tabButtonToolBar}>
      <div className={classes.innerContainer}>
        {tabs.map(t => (
          <NavLink end key={t.url} className={({ isActive }) => `${classes.tab} ${isActive ? classes.active : ''}`} to={t.url}>
            {t.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default TabNavigation;
