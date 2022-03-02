import classes from "./Fade.module.scss";

interface IProps {
  duration: number; // length of animation (miliseconds)
  delay: number; // length to delay animation start (miliseconds)
  children: any;
}

/**
 * Fades in children after a delay
 * @param props
 * @returns
 */
const Fade = (props: IProps) => {
  const { duration, delay, children } = props;

  return (
    <div
      className={classes.Fade}
      style={{
        animationDuration: `${duration}ms`,
        animationDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

export default Fade;
