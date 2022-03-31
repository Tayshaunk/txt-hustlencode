import CreatePostModule from 'components/CreatePostModule/CreatePostModule';
import IsAuthed from 'components/IsAuthed/IsAuthed';
import PageLoader from 'components/PageLoader/PageLoader';
import PostFeed from 'pages/profile_pages/ProfilePosts/PostFeed/PostFeed';
import { Container, Row, Col } from 'react-bootstrap';
import { useOutletContext } from 'react-router-dom';
import ViewComment from '../../../components/Comments/ViewComment'

const ProfilePosts = () => {
  // get user profile from router outlet context
  const { username }: { username: string } = useOutletContext();
  return (
    <Container fluid>
      <Row style={{ justifyContent: 'center' }}>
        {username ? (
          <Col md={9} lg={8}>
            <IsAuthed type={'username'} value={username}>
              <CreatePostModule />
            </IsAuthed>
            <PostFeed username={username} />
          </Col>
        ) : (
          <PageLoader style={{ height: '100%', width: '100%' }} isVisible={true} fullscreen={false} theme={'light'} />
        )}
      </Row>
    </Container>
  );
};

export default ProfilePosts;
