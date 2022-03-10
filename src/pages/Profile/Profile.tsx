import { Col, Container, Row } from 'react-bootstrap';
import { Navigate, useParams } from 'react-router-dom';
import useProfile from 'hooks/useProfile';
import PageLoader from 'components/PageLoader/PageLoader';
import Aux from 'components/_Aux/_Aux';
import { IHustlencodeUser } from 'interfaces/user.interface';
import Cover from './components/Cover/Cover';
import { useAppSelector } from 'store/hooks';
import { getUser } from 'store/slices/userSessionSlice';
import RenderHtml from 'components/RenderHtml/RenderHtml';
import ProfileModule from 'components/ProfileModule/ProfileModule';
import PostFeed from './components/PostFeed/PostFeed';
// styles
import pageLayoutClasses from 'styles/modules/pageLayout.module.scss';
import classes from './Profile.module.scss';
import CreatePostModule from './components/CreatePostModule/CreatePostModule';
import useIsMobile from 'hooks/useIsMobile';
import { Button } from 'rsuite';
import { useState } from 'react';

const tabs = [
  {
    label: 'Post Feed',
  },
  {
    label: 'Profile',
  },
];

/**
 * Renders the users profile page.
 * The users profile page contains the user's
 * posts
 * @returns
 */
const Profile = () => {
  // current active tab
  const [activeTab, setActiveTab] = useState<number>(0);

  const { username } = useParams();

  // get signed in user
  const user = useAppSelector(getUser);

  // get profile state
  const profile = useProfile(username);

  // tracks is screen width is within mobile range
  const isMobile = useIsMobile();

  const renderDesktopView = (userProfile: IHustlencodeUser) => (
    <div className={classes.content}>
      <Container fluid>
        <Row>
          <Col md={7} lg={7} className={classes.leftCol}>
            <CreatePostModule />
            <PostFeed id={userProfile._id} />
          </Col>

          <Col md={5} lg={5} className={classes.rightCol}>
            <ProfileModule
              type="aboutWidget"
              title={`About ${userProfile.firstName}`}
              html={userProfile.aboutWidget.html}
              css={userProfile.aboutWidget.css}
              js={userProfile.aboutWidget.js}
            />

            <ProfileModule
              type="interestsWidget"
              title={`${userProfile.firstName}'s Interests`}
              html={userProfile.interestsWidget.html}
              css={userProfile.interestsWidget.css}
              js={userProfile.interestsWidget.js}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );

  const renderMobileView = (userProfile: IHustlencodeUser) => (
    <Aux>
      <div className={classes.tabButtonToolBar}>
        {tabs.map((t, i) => (
          <div key={t.label} className={`${classes.tab} ${i === activeTab ? classes.active : ''}`}>
            <Button
              className={classes.tabBtn}
              onClick={() => {
                setActiveTab(i);
              }}
            >
              <p>{t.label}</p>
            </Button>
          </div>
        ))}
      </div>
      <div className={classes.content}>
        <Container fluid>
          <Row>
            {activeTab === 0 ? (
              <Col md={12} lg={12} className={classes.leftCol}>
                <CreatePostModule />
                <PostFeed id={userProfile._id} />
              </Col>
            ) : (
              <Col md={5} lg={5} className={classes.rightCol}>
                <ProfileModule
                  type="aboutWidget"
                  title={`About ${userProfile.firstName}`}
                  html={userProfile.aboutWidget.html}
                  css={userProfile.aboutWidget.css}
                  js={userProfile.aboutWidget.js}
                />

                <ProfileModule
                  type="interestsWidget"
                  title={`${userProfile.firstName}'s Interests`}
                  html={userProfile.interestsWidget.html}
                  css={userProfile.interestsWidget.css}
                  js={userProfile.interestsWidget.js}
                />
              </Col>
            )}
          </Row>
        </Container>
      </div>
    </Aux>
  );

  const renderContent = (userProfile: IHustlencodeUser) => (
    <div className={` ${pageLayoutClasses.pageWrapper} ${classes.profileContainer}`} id="entry">
      {/* render profile layout styles */}
      <RenderHtml html={`<style>${userProfile.layoutWidget.css}</style>`} />

      <Row className="g-0">
        {/* render profile cover section - contains profile image and cover image*/}
        <Col md={12} lg={12}>
          <Cover
            username={userProfile.username}
            coverImage={userProfile.coverImg}
            profileImage={userProfile.profileImg}
            name={userProfile.name}
            gender={userProfile.gender}
          />
        </Col>
      </Row>

      <div>{isMobile.value ? renderMobileView(userProfile) : renderDesktopView(userProfile)}</div>
    </div>
  );

  /**
   * Checks if profile data is not null. Otherwise
   * shows 404 error
   * @returns
   */
  const checkProfile = () => <Aux>{profile.value ? renderContent(profile.value) : null}</Aux>;

  /**
   * Shows loader
   * @returns
   * - loader html
   */
  const renderPageLoader = () => (
    <div style={{ height: '100vh', width: '100vw' }}>
      <PageLoader isVisible={true} fullscreen={false} theme={'dark'} />
    </div>
  );

  return (
    <Aux>
      {typeof username === 'undefined' && user ? <Navigate to={`/${user.username}`} /> : null}
      {!profile.isLoading && user ? checkProfile() : renderPageLoader()}
    </Aux>
  );
};

export default Profile;
