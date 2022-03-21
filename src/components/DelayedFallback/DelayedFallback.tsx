import PageLoader from 'components/PageLoader/PageLoader';
import { useEffect, useState } from 'react';

interface IProps {
  delay: number;
  theme: 'light' | 'dark';
  fullscreen: boolean;
  style?: any;
}
/**
 * This component waits for timeout to complete
 * before rendering the PageLoader. This is useful for
 * React components that lazily loaded. It prevents the white flash when the
 * component loads
 * @param param0
 * @returns
 */
const DelayedFallback = ({ delay, theme, fullscreen, style }: IProps) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // do not show loader until delay is done
    const timeout = setTimeout(() => {
      setShow(true);
    }, delay);

    return () => {
      // on component unload, clear the timer
      clearTimeout(timeout);
    };
  }, [delay]);

  return show ? <PageLoader style={style} theme={theme} isVisible={true} fullscreen={fullscreen} /> : null;
};

export default DelayedFallback;
