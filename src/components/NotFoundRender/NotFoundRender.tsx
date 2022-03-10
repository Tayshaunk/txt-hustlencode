import NotFound from "components/NotFound/NotFound";
import Aux from "components/_Aux/_Aux";

/**
 * Renders children if the value is not null or undefined
 * Renders not found component otherwise
 * @param param0 
 * @returns 
 */
const NotFoundRender = ({ val, children }: { val?: any; children: any }) => {
  return <Aux>{val ? children : <NotFound />}</Aux>;
};

export default NotFoundRender;
