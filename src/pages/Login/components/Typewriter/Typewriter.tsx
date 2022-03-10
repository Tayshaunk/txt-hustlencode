import Aux from 'components/_Aux/_Aux';
import { creed } from 'constants/creed.constatns';
import { useEffect, useState } from 'react';
import TypeWriterEffect from 'react-typewriter-effect';
import { getWidth } from 'util/window.util';

// default typewriter styles
const styles = { fontFamily: 'Roboto', color: '#fff', fontWeight: 400, textAlign: 'center', fontSize: 25, lineHeight: '44px' };
// styles for lg screens
const lgStyles = { fontFamily: 'Roboto', color: '#fff', fontWeight: 400, textAlign: 'center', fontSize: 35, lineHeight: '44px' };

/**
 * Renders typwriter that displays leadership creed
 * @returns
 */
const TypeWriter = () => {
  const [typerIndex, setTyperIndex] = useState<number>(0);
  const [show, setShow] = useState<boolean>(false);
  const [typerStyles, setTyperStyles] = useState<any>(styles);

  useEffect(() => {
    // mount
    let m = true;
    // timer for changing creed
    let indexTimer: ReturnType<typeof setTimeout>;
    let fadeTimer: ReturnType<typeof setTimeout>;

    const startTypewriterTimer = () => {
      setShow(true);
      // wait for timer before switching creeds
      fadeTimer = setTimeout(() => {
        const i = typerIndex + 1;

        // reset
        if (i >= creed.length) setTyperIndex(0);
        // go to next
        else setTyperIndex(i);
      }, 12000);

      // wait for timer before switching creeds
      indexTimer = setTimeout(() => setShow(false), 11000);
    };

    // change style based on width
    function resizeListener() {
      const width = getWidth();

      // set lg styles
      if (width >= 1800) setTyperStyles(lgStyles);
      // set default styles
      else setTyperStyles(styles);
    }

    if (m) {
      window.addEventListener('resize', resizeListener);
      resizeListener();
      startTypewriterTimer();
    }

    return () => {
      // unmount
      m = false;
      // remove resize listeners
      clearTimeout(indexTimer);
      clearTimeout(fadeTimer);
      window.removeEventListener('resize', resizeListener);
      window.addEventListener('load', resizeListener);
    };
  }, [typerIndex]);

  return (
    <Aux>
      {show ? (
        <TypeWriterEffect textStyle={typerStyles} startDelay={100} cursorColor="transparent" text={creed[typerIndex]} typeSpeed={100} />
      ) : (
        <div />
      )}
    </Aux>
  );
};

export default TypeWriter;
