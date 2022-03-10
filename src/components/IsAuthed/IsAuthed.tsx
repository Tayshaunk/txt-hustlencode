import Aux from 'components/_Aux/_Aux';
import { IHustlencodeUser } from 'interfaces/user.interface';
import { useAppSelector } from 'store/hooks';
import { getUser } from 'store/slices/userSessionSlice';

interface IProps {
  userId?: string;
  children: any;
}

/**
 * Renders children if the the current user id matches
 * the provided id
 * @param props
 * @returns
 */
const IsAuthed = (props: IProps) => {
  const { userId, children } = props;

  const user = useAppSelector(getUser);

  return <Aux>{user && userId && user._id === userId ? children : null}</Aux>;
};

export default IsAuthed;
