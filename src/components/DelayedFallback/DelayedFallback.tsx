import PageLoader from "components/PageLoader/PageLoader";
import { useEffect, useState } from "react";
// styles
import pageLayoutClasses from "styles/modules/pageLayout.module.scss";
import { isReturnStatement } from "typescript";

const DelayedFallback = ({ delay }: { delay: number }) => {
  const [show, setShow] = useState(false);

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

  return show ? (
    <PageLoader theme="light" isVisible={true} fullscreen={true} />
  ) : null;
};

export default DelayedFallback;
