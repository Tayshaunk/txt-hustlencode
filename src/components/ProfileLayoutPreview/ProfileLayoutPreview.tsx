import RenderHtml from 'components/RenderHtml/RenderHtml';
import { ICode } from 'interfaces/post.interface';
import Cover from 'pages/profile_pages/Profile/components/Cover/Cover';
import { useAppSelector } from 'store/hooks';
import { getUser } from 'store/slices/userSessionSlice';
// import styles
import classes from './ProfileLayoutPreview.module.scss';

interface IProps {
  profileCode: ICode;
}

const ProfileLayoutPreview = (props: IProps) => {
  // get props
  const { profileCode } = props;

  const user = useAppSelector(getUser);

  return (
    <div className={classes.container} id="entry">
      {/* render profile layout styles */}
      <RenderHtml html={`<style>${profileCode.css}</style>`} />

      {user ? (
        <div>
          <Cover
            username={user.username}
            coverImage={user.coverImg}
            profileImage={user.profileImg}
            name={user.name}
            gender={user.gender}
          />
        </div>
      ) : null}
    </div>
  );
};

export default ProfileLayoutPreview;
