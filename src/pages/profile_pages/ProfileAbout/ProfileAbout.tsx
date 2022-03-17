import PageLoader from 'components/PageLoader/PageLoader';
import ProfileAboutModule from 'components/ProfileAboutModule/ProfileAboutModule';
import ProfileInterestsModule from 'components/ProfileInterestsModule/ProfileInterestsModule';

import { Container, Row, Col } from 'react-bootstrap';
import { useOutletContext } from 'react-router-dom';

const ProfileAbout = () => {
  // get user profile from router outlet context
  const { username }: { username: string } = useOutletContext();

  return (
    <Container fluid>
      {username ? (
        <Row style={{ justifyContent: 'center' }}>
          <Col md={9} lg={6}>
            <ProfileAboutModule username={username} />
          </Col>
          <Col md={9} lg={6}>
            <ProfileInterestsModule username={username} />
          </Col>
        </Row>
      ) : (
        <PageLoader style={{ height: '100%', width: '100%' }} isVisible={true} fullscreen={false} theme={'light'} />
      )}
    </Container>
  );
};

export default ProfileAbout;
