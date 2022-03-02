import NavBar from 'components/NavBar/NavBar';
import { Col, Container, Row } from 'react-bootstrap';

// styles
import pageLayoutClasses from 'styles/modules/pageLayout.module.scss';

/**
 * Renders a view with a welcome message and Login
 * Form. Users are able to sign in with their credentials
 * @returns
 */
const Profile = () => {
  return (
    <div className={pageLayoutClasses.pageWrapper}>
      <NavBar  />
      <Container fluid>
        <Row>
          <Col md={12} lg={12}></Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;
