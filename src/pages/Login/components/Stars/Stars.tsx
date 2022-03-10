import classes from './Stars.module.scss';

/**
 * Returns a random pixel within the starFieldWidth
 * @returns string with value + px
 */
const genRandomPixel = () => {
  const starFieldWidth = 3060;
  return Math.floor(Math.random() * starFieldWidth) + 1 + 'px ';
};

/**
 * Returns box shadow with white spots at random pixels.
 * n represents the number stars to add
 * @param n number of stars to add/create
 * @returns
 * - string; the box shadow style for the star container
 */
const getStars = (n: number) => {
  var shadows = genRandomPixel() + genRandomPixel() + '#fff';
  for (var i = 2; i < n; i++) {
    shadows += ', ' + genRandomPixel() + genRandomPixel() + '#fff';
  }

  return shadows;
};

const Stars = () => {
  return (
    <div className={classes.sky}>
      <div className={classes.stars1} style={{ boxShadow: getStars(1700) }} />
      <div className={classes.stars2} style={{ boxShadow: getStars(700) }} />
      <div className={classes.stars3} style={{ boxShadow: getStars(200) }} />
      <div className={classes.shootingStars} />
    </div>
  );
};

export default Stars;
