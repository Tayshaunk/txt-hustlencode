import { useEffect, useState } from 'react';
import { getWidth } from 'util/window.util';
import Stars from '../Stars/Stars';
import TypeWriter from '../Typewriter/Typewriter';

// styles
import classes from './OceanScene.module.scss';

// styles for waves - md-lg desktop
const defaultWaveStyles = [
  { bottom: -28, height: 185, animationDuration: '5.2s', zIndex: 10 },
  { bottom: -12, height: 230, left: '-75%', animationDuration: '6.44444s', zIndex: 9 },
  { bottom: 12, height: 190, animationDuration: '6.77778s', zIndex: 8 },
  { bottom: 24, height: 173, left: '-75%', animationDuration: '7.22222s', zIndex: 7 },
  { bottom: 30, height: 173, animationDuration: '7.66667s', zIndex: 6 },
];

// styles for waves - xl desktop
const lgWaveStyles = [
  { bottom: -75, height: 270, animationDuration: '5.6s', zIndex: 10 },
  { bottom: -32, height: 270, left: '-75%', animationDuration: '6.44444s', zIndex: 9 },
  { bottom: -20, height: 270, animationDuration: '6.77778s', zIndex: 8 },
  { bottom: 24, height: 270, left: '-75%', animationDuration: '7.22222s', zIndex: 7 },
  { bottom: 30, height: 270, animationDuration: '7.66667s', zIndex: 6 },
];


const OceanScene = () => {
  const [waves, setWaves] = useState<any[]>(defaultWaveStyles);

  useEffect(() => {
    // mount
    let m = true;

    /**
     * Updates wave styles based
     * on window width
     */
    const resizeListener = () => {
      const width = getWidth();

      // set lg styles
      if (width >= 1800) setWaves(lgWaveStyles);
      // set default styles
      else setWaves(defaultWaveStyles);
    };

    if (m) {
      window.addEventListener('resize', resizeListener);
      resizeListener();
    }

    return () => {
      // unmount
      m = false;

      // remove resize listeners
      window.removeEventListener('resize', resizeListener);
      window.addEventListener('load', resizeListener);
    };
  }, []);

  return (
    <div className={classes.container}>
      {/* render text */}
      <div className={classes.typewriter}>
        <TypeWriter />
      </div>

      {/* render stars */}
      <Stars />

      {/* render waves at their positions */}
      {waves.map((wave, i) => (
        <div key={i} className={classes.wave} style={wave} />
      ))}

      {/* render boat */}
      <div className={classes.boatContainer}>
        <div className={classes.boat}></div>
      </div>
    </div>
  );
};

export default OceanScene;
