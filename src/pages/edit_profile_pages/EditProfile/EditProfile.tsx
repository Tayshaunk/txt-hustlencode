import CreatePostModule from 'components/CreatePostModule/CreatePostModule';
import PageLoader from 'components/PageLoader/PageLoader';
import Aux from 'components/_Aux/_Aux';
import { Container, Col, Row } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { useAppSelector } from 'store/hooks';
import { getUser } from 'store/slices/userSessionSlice';
import EditProfileSideMenu from './components/EditProfileSideMenu/EditProfileSideMenu';

// stylesa
import classes from './EditProfile.module.scss';

const EditProfile = () => {
  const user = useAppSelector(getUser);

  const renderContent = () => (
    <div className={classes.content}>
      <Container fluid>
        <Row style={{ justifyContent: 'center' }}>
          <Col md={12} lg={12}>
              <div className={classes.header}>
              <h1>{`${user?.name} / General`}</h1>
              </div>
          </Col>
          <Col md={4} lg={4}>
            <EditProfileSideMenu />
          </Col>
          <Col md={8} lg={8}>
            <Outlet />
          </Col>
        </Row>
      </Container>
    </div>
  );

  return (
    <Aux>
      {user ? renderContent() : <PageLoader style={{ height: '100vh', width: '100vw' }} isVisible={true} fullscreen={false} theme={'dark'} />}
    </Aux>
  );
};

export default EditProfile;
