import Aux from 'components/_Aux/_Aux';
import { IHustlencodeUser } from 'interfaces/user.interface';
import { useAppSelector } from 'store/hooks';
import { getUser } from 'store/slices/userSessionSlice';

interface IProps {
  value?: string;
  type: 'id' | 'username';
  children: any;
}

/**
 * Renders children if the the current user id matches
 * the provided id
 * @param props
 * @returns
 */
const IsAuthed = (props: IProps) => {
  const { type, value, children } = props;

  const user = useAppSelector(getUser);

  const renderContent = (user: IHustlencodeUser) => {
    let content = null;

    if (type === 'id' && user._id === value) content = children;

    if (type === 'username' && user.username === value) content = children;

    return <Aux>{content}</Aux>;
  };

  return <Aux>{user && value ? renderContent(user) : null}</Aux>;
};

export default IsAuthed;
