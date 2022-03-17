import { Outlet, useParams } from 'react-router-dom';
import useProfile from 'hooks/useProfile';
import PageLoader from 'components/PageLoader/PageLoader';
import Aux from 'components/_Aux/_Aux';
import { IHustlencodeUser } from 'interfaces/user.interface';
import Cover from './components/Cover/Cover';
import RenderHtml from 'components/RenderHtml/RenderHtml';
import TabNavigation from 'components/TabNavigation/TabNavigation';
import NotFound from 'components/NotFound/NotFound';
// styles
import pageLayoutClasses from 'styles/modules/pageLayout.module.scss';
import classes from './Profile.module.scss';

/**
 * Renders the users profile page.
 * The users profile page contains the user's
 * posts
 * @returns
 */
const Profile = () => {
  const { username } = useParams();

  // get profile state
  const profile = useProfile(username);

  const tabs = [
    { label: 'About', url: `/user/${username}` },
    { label: 'Posts', url: `/user/${username}/posts` },
    //  { label: 'Friends', url: `/user/${username}/posts` },
  ];

  const renderContent = (userProfile: IHustlencodeUser) => (
    <div className={` ${pageLayoutClasses.pageWrapper} ${classes.profileContainer}`} id="entry">
      {/* render profile layout styles */}
      <RenderHtml html={`<style>${userProfile.layoutWidget.css}</style>`} />

      <div>
        <Cover
          username={userProfile.username}
          coverImage={userProfile.coverImg}
          profileImage={userProfile.profileImg}
          name={userProfile.name}
          gender={userProfile.gender}
        />
      </div>

      <div className={classes.content}>
        <TabNavigation tabs={tabs} />

        <Outlet context={{ username: username }} />
      </div>
    </div>
  );

  /**
   * Checks if profile data is not null. Otherwise
   * shows 404 error
   * @returns
   */
  const checkProfile = () => <Aux>{profile.value ? renderContent(profile.value) : <NotFound />}</Aux>;

  return (
    <Aux>
      {!profile.isLoading ? (
        checkProfile()
      ) : (
        <PageLoader style={{ height: '100vh', width: '100vw' }} isVisible={true} fullscreen={false} theme={'dark'} />
      )}
    </Aux>
  );
};
// && username
export default Profile;
