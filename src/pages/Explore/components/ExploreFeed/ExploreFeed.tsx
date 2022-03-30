import PageLoader from 'components/PageLoader/PageLoader';
import PostModule from 'components/PostModule/PostModule';
import Aux from 'components/_Aux/_Aux';
import InfiniteScroll from 'react-infinite-scroll-component';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useExplore from 'hooks/posts/useExplore';

const ExploreFeed = () => {
  // get user's explore post feed
  const posts = useExplore();

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
      loader={<FontAwesomeIcon style={{ color: '#282828' }} spin icon={faSyncAlt} />}
      endMessage={
        <p style={{ textAlign: 'center', marginTop: 25 }}>
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

  return <Aux>{posts.isLoading ? renderPageLoader() : renderPosts()}</Aux>;
};

export default ExploreFeed;
