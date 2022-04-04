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

const CommentFeed = () => {
    const loadMoreComments = () => {
        console.log('loading more comments!')
    }

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
            {userPostDummyPosts.map((comment, i) => (
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