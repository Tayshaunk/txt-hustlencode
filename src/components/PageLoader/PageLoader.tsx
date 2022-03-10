import React, { useEffect, useState } from 'react';

import classes from './PageLoader.module.scss';

interface ILoaderProps {
  isVisible: boolean;
  fullscreen: boolean;
  theme: 'dark' | 'light';
  style?: any;
}

/**
 * Renders screen loader. Loader disappears 400ms
 * after isVisible is set to false
 * @param param0
 * @returns
 */
const PageLoader = (props: ILoaderProps) => {
  const { style={}, isVisible, fullscreen, theme } = props;

  const [hide, setHide] = useState(false); // loader is visible when hide = false

  /**
   * Check isVisible every time it
   * changes. If isVisible = false, set
   * a timer to hide the loader
   */
  useEffect(() => {
    let mounted = true;
    let timer1: ReturnType<typeof setTimeout>;

    if (!isVisible && mounted) {
      timer1 = setTimeout(() => {
        setHide(true);
      }, 400);
    }

    // this will clear Timeout when component unmount like in willComponentUnmount
    return () => {
      mounted = false;
      if (timer1) clearTimeout(timer1);
    };
  }, [isVisible, setHide]);

  return (
    <div
      style={{ ...style, backgroundColor: theme === 'dark' ? '#282828' : '#fff' }}
      className={`${classes.Wrapper} ${isVisible ? '' : classes.Visuallyhidden} ${hide ? classes.Hidden : ''} ${
        fullscreen ? `${classes.Fullscreen}` : ''
      }`}
    >
      <div className={classes.Container}>
        <div className={classes.Center} />

        <div className={classes.Inner}>
          <div className={classes.Inner__item} />
          <div className={classes.Inner__item} />
          <div className={classes.Inner__item} />
          <div className={classes.Inner__item} />
        </div>

        <div className={classes.Outer}>
          <div className={classes.Outer__item} />
          <div className={classes.Outer__item} />
          <div className={classes.Outer__item} />
          <div className={classes.Outer__item} />
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
