import React, { Fragment } from 'react';

// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';

// dummy data
import userPostDummyPosts from 'dummyComments';

// components
import ViewComment from './ViewComment';

// styles
import classes from './CommentFeed.module.scss';

/**
 * @param props takes in post Id from PostFeed component to be able to filter out comments
 * @returns listing out comments based on the post
 */
const CommentFeed = (props: any) => {
    const loadMoreComments = () => {
        console.log('loading more comments!')
    }

    // TODO: need to add logic to add get more posts if there are more posts
    // TODO: create logic to hide 'view more comments' button if no comments available
    const viewMoreComments = () => {
        return (
            <div className={classes.loadCommentsBorder}>
                <p onClick={loadMoreComments}>
                <FontAwesomeIcon icon={faComments}/>
                    View more comments
                </p>
            </div>
        )
    }

    return (
        <div className={classes.commentFeedContainer}>
            {userPostDummyPosts.filter(idPost => idPost.postId.includes(props.postId)).map((comment, i) => (
                <Fragment>    
                    <ViewComment
                    key={i}
                    name={comment.name}
                    comment={comment.comment}
                    username={comment.username}
                    postDate={comment.postDate}
                    profileImg={comment.profileImg}
                    />
                </Fragment>
            ))}
            {viewMoreComments()}
        </div>
    );
};

export default CommentFeed;