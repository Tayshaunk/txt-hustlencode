import PageLoader from 'components/PageLoader/PageLoader';
import PostModule from 'components/PostModule/PostModule';
import Aux from 'components/_Aux/_Aux';
import usePosts from 'hooks/usePosts';
import InfiniteScroll from 'react-infinite-scroll-component';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// styles
import classes from './PostFeed.module.scss';

/**
 * This component renders the users post feed and the
 * create post module
 * @param param0
 * @returns
 */
const PostFeed = ({ username }: { username: string }) => {
  // get user's post feed
  const posts = usePosts(username);

  /**
   * Shows loader
   * @returns
   * - loader html
   */
  const renderPageLoader = () => (
    <div style={{ height: '100%', width: '100%' }}>
      <PageLoader isVisible={true} fullscreen={false} theme={'light'} />
    </div>
  );

  /**
   * Renders users posts
   * @returns
   */
  const renderPosts = () => (
    <InfiniteScroll
      dataLength={posts.value.length}
      next={posts.pullMorePosts}
      hasMore={posts.postCount > posts.value.length}
      loader={<div className={classes.loader}><FontAwesomeIcon style={{ color: '#282828',  }} spin icon={faSpinner} /></div>}
      endMessage={
        <p style={{ textAlign: 'center', paddingTop: 35 }}>
          <b>End of feed</b>
        </p>
      }
    >
      {posts.value.map(post => (
        <PostModule
          postId={post._id}
          createdOn={post.createdOn}
          postUser={post.user}
          key={post._id}
          html={post.html}
          css={post.css}
          js={post.js}
          removePost={posts.removePost}
        />
      ))}
    </InfiniteScroll>
  );

  const renderEmptyFeed = () => (
    <div className={classes.emptyFeed}>
      <p>{username} hasn't posted yet</p>
    </div>
  );

  return <Aux>{posts.isLoading ? renderPageLoader() : posts.value.length > 0 ? renderPosts() : renderEmptyFeed()}</Aux>;
};

export default PostFeed;
