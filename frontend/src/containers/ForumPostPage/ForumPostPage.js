import '../../assets/ForumApp.css';
import PostComment from './PostComment.js';
import PostOp from './PostOp';
import PostNew from './PostNew';
import { useEffect } from "react";
import Moment from 'react-moment';
import { useDispatch, useSelector} from 'react-redux'
import Spinner from '../../components/Spinner';
import {getSpecificPost, reset }from "../../features/posts/postSlice";
import { useParams } from 'react-router-dom';

function ForumPostPage(props) {
  const params = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSpecificPost(params.id)).then(() => dispatch(reset()))
  }, [dispatch, params.id])

  const { currentPost } = useSelector((state) => state.posts);

  return (
    <div className="ForumPostPage">
      {
        currentPost !== null
        ? <div className='ForumPostPageContainer'>
            <PostOp title={currentPost.title} likes={currentPost.likes} dislikes={currentPost.dislikes} pinned={true} 
            content={currentPost.content} profileImage={currentPost.user.profileImage}
            author={currentPost.user.name} time={<Moment fromNow>{currentPost.createdAt}</Moment>} comments={currentPost.comments}/>
            <PostComment reply={false} />
            {currentPost.comments.map((comment) => 
              <PostNew key={comment._id} commentId={comment._id} replies={comment.replies} likes={comment.likes} 
              dislikes={comment.dislikes} profileImage={comment.author.profileImage} content={comment.content} author={comment.author} time={<Moment fromNow>{comment.createdAt}</Moment>}/>)
            }
          </div>
        : <Spinner />
      }
    </div>
  );
}

export default ForumPostPage;