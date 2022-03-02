import NavBar from 'components/NavBar/NavBar';
import { Col, Container, Row } from 'react-bootstrap';
import Cover from './components/Cover/Cover';
import { useParams } from 'react-router-dom';
import useProfile from 'hooks/useProfile';
// styles
import pageLayoutClasses from 'styles/modules/pageLayout.module.scss';
import classes from './Profile.module.scss';
import PageLoader from 'components/PageLoader/PageLoader';
import Aux from 'components/_Aux/_Aux';

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

  const renderContent = () => (
    <div className={` ${pageLayoutClasses.pageWrapper} ${classes.profileContainer}`}>
      <Container fluid>
        <Row>
          <Col md={12} lg={12}>
            <Cover />
          </Col>
        </Row>
      </Container>
    </div>
  );

  const renderPageLoader = () => (
    <div style={{ height: '100vh', width: '100vw' }}>
      <PageLoader isVisible={true} fullscreen={false} theme={'dark'} />
    </div>
  );

  return (
    <Aux>
      <NavBar />
      {profile.isLoading ? renderPageLoader() : renderContent()}
    </Aux>
  );
};

export default Profile;
