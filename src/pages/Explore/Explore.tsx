import CreatePostModule from 'components/CreatePostModule/CreatePostModule';
import PageLoader from 'components/PageLoader/PageLoader';
import Aux from 'components/_Aux/_Aux';
import { Container, Col, Row } from 'react-bootstrap';
import { useAppSelector } from 'store/hooks';
import { getUser } from 'store/slices/userSessionSlice';
import ExploreFeed from './components/ExploreFeed/ExploreFeed';

// stylesa
import classes from './Explore.module.scss';

const Explore = () => {
  const user = useAppSelector(getUser);

  const renderContent = () => (
    <div className={classes.content}>
      <Container fluid>
        <Row style={{ justifyContent: 'center' }}>
          <Col md={9} lg={8}>
            <CreatePostModule />
            <ExploreFeed />
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

export default Explore;
