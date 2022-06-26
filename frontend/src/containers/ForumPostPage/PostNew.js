import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../assets/ForumApp.css';
import { useState } from "react";
import PostReply from './PostReply';
import PostComment from './PostComment';
import { dislikeComment, likeComment, reset } from '../../features/posts/postSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import LoadingIcons from 'react-loading-icons';
import Moment from 'react-moment';

function PostNew(props) {
  const [commenting, setCommenting] = useState(false);
  const updateCommenting = () => setCommenting(!commenting);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth)
  const { isCommentsLoading } = useSelector((state) => state.posts)
  

  const onLike = () => {
    if (!user) {
      toast.error("You are not logged in.");
    }
    dispatch(likeComment(props.commentId)).then(() => {
        dispatch(reset());
    });
  }

  const onDislike = () => {
    if (!user) {
      toast.error("You are not logged in.");
    }
    
    dispatch(dislikeComment(props.commentId)).then(() => {
        dispatch(reset());
    });

  }
  
  return (
    <div className="PostNew">
      <div className='PostNewHeader'>
        <div className='PostNewIcon'>
          <img className='OpIcon' src={props.profileImage ? props.profileImage : 'https://res.cloudinary.com/dqreeripf/image/upload/v1656242180/xdqcnyg5zu0y9iijznvf.jpg'} alt='user profile' />
        </div>
        <h5 className='PostNewAuthor'>{props.author.name}</h5>
        <h5 className='PostNewTime'>{props.time} ({props.replies.length} replies)</h5>
      </div>
      <div className='PostNewContent'>
        <p>
          {props.content}
        </p>
      </div>
      <div className='PostNewFooter'>
      <div className='PostNewFooterVotes'>
        {
          isCommentsLoading
          ? <LoadingIcons.ThreeDots height="0.5rem" width="4.9rem" fill="#000000" />
          : <>
              <FontAwesomeIcon icon={faThumbsUp} className="PostNewVoteIcon" id='LikeButton' 
                style={user && props.likes.includes(user._id) ? {color:'green'} : {color:'initial'}} onClick={onLike}/>
              <h5 className='PostNewVoteIcon'>{props.likes.length}</h5>
              <FontAwesomeIcon icon={faThumbsDown} className="PostNewVoteIcon" id='DislikeButton' 
                style={user && props.dislikes.includes(user._id) ? {color:'red'} : {color:'initial'}} onClick={onDislike}/>
              <h5 className='PostNewVoteIcon'>{props.dislikes.length}</h5>
            </>
        }
        
      </div>

        
        

        <button onClick={updateCommenting}>Reply</button>
        <button>Report</button>
      </div>
      {commenting ? <PostComment commentId={props.commentId} commentAuthor={props.author} updateCommenting={updateCommenting} reply={true}/> : <></>}
      <div className='PostNewRepliesContainer'>
        {props.replies.map((reply) => 
          <PostReply key={reply._id} commentId={props.commentId} replyId={reply._id} likes={reply.likes} dislikes={reply.dislikes}
          content={reply.content} profileImage={reply.author.profileImage} author={reply.author} time={<Moment fromNow>{reply.createdAt}</Moment>}/>)}
      </div>
    </div>
  );
}

export default PostNew;