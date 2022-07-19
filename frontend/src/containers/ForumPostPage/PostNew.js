import { faThumbsUp, faThumbsDown,  faTrashCan, faPenToSquare, faEllipsis, faFlag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../assets/ForumApp.css';
import { useState } from "react";
import PostReply from './PostReply';
import PostComment from './PostComment';
import { dislikeComment, likeComment, reset, deleteComment, editComment} from '../../features/posts/postSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import LoadingIcons from 'react-loading-icons';
import Moment from 'react-moment';
import { useNavigate } from 'react-router-dom';

function PostNew(props) {
  const [commenting, setCommenting] = useState(false);
  const updateCommenting = () => setCommenting(!commenting);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPostOptions, setShowPostOptions] = useState(false)
  const { user } = useSelector((state) => state.auth)
  const { isCommentsLoading } = useSelector((state) => state.posts)
  const [repliesDisplayedCount, setRepliesDisplayedCount] = useState(5)
  const [clicked, setClicked] = useState(false)
  const [changeContent, setChangeContent] = useState(props.content)
  

  const onLike = () => {
    if (!user) {
      toast.error("You are not logged in.");
    }

    if (!user.verified) {
      toast.error("You have not verified your email.");
  }
    dispatch(likeComment(props.commentId)).then(() => {
        dispatch(reset());
    });
  }

  const onDislike = () => {
    if (!user) {
      toast.error("You are not logged in.");
    }
    
    if (!user.verified) {
      toast.error("You have not verified your email.");
  }
    dispatch(dislikeComment(props.commentId)).then(() => {
        dispatch(reset());
    });
  }

  const deleteUserComment = (id) => {
    dispatch(deleteComment(id)).then(()=> dispatch(reset()))
  }

  const editUserComment = (content, id) => {
    dispatch(editComment({commentContent: content, commentId: id})).then(()=> dispatch(reset()))
    setClicked(!clicked)
  }

  const changeContentText = (e) => {
    setChangeContent(e.target.value)
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
        <p>{!clicked ? props.content : <><textarea id='text' onChange={changeContentText} cols="30" rows="5">{changeContent}</textarea> <input onClick={() => editUserComment(changeContent, props.commentId)} value='Save' required type="submit" /></>}</p>
      </div>
      <div className='PostNewFooter'>
      <div className='PostNewFooterVotes'>
        {
          isCommentsLoading
          ? <LoadingIcons.ThreeDots height="0.5rem" width="4.9rem" fill="#000000" />
          : <>
              <FontAwesomeIcon icon={faThumbsUp} className="PostNewVoteIcon" id='LikeButton' 
                style={user && props.likes.includes(user._id) ? {color:'var(--color-accepted)'} : {color:'inherit'}} onClick={onLike}/>
              <h5 className='PostNewVoteIcon'>{props.likes.length}</h5>
              <FontAwesomeIcon icon={faThumbsDown} className="PostNewVoteIcon" id='DislikeButton' 
                style={user && props.dislikes.includes(user._id) ? {color:'var(--color-remove)'} : {color:'inherit'}} onClick={onDislike}/>
              <h5 className='PostNewVoteIcon'>{props.dislikes.length}</h5>
            </>
        }
        
      </div>

        
        

        <button onClick={updateCommenting}>Reply</button>
        <div className='more-options-btn' onClick={() => setShowPostOptions(!showPostOptions)}>
          <FontAwesomeIcon icon={faEllipsis}/>
            {
              showPostOptions 
              ? <div className='post-options-container'>
                  {
                    
                      user.name === props.author.name 
                      ? <>
                          <span onClick={() => deleteUserComment(props.commentId)}>
                            <FontAwesomeIcon className="deleteIcon" icon={faTrashCan} />
                            Delete
                          </span>
                          
                          <span onClick = {() => setClicked(!clicked)}>
                            <FontAwesomeIcon className="editIcon" icon={faPenToSquare}  /> 
                            Edit
                          </span>
                        </>
                      : <span onClick={() => navigate('/report')}>
                          <FontAwesomeIcon className="deleteIcon" icon={faFlag} />
                          Report
                        </span>
                  }
                  
                  
                </div> 
              : <></>
            }
        </div>
      </div>
      {commenting ? <PostComment commentId={props.commentId} commentAuthor={props.author} updateCommenting={updateCommenting} reply={true}/> : <></>}
      <div className='PostNewRepliesContainer'>
        {props.replies.slice(0, repliesDisplayedCount).map((reply) => 
          <PostReply key={reply._id} commentId={props.commentId} commentAuthor={props.author} replyId={reply._id} likes={reply.likes} dislikes={reply.dislikes}
          content={reply.content} profileImage={reply.author.profileImage} author={reply.author} time={<Moment fromNow>{reply.createdAt}</Moment>}/>)}
        {
              repliesDisplayedCount >= props.replies.length
              ? <></>
              : <h4 className='show-more-btn' onClick={() => repliesDisplayedCount + 5 > props.replies.length ? setRepliesDisplayedCount(props.replies.length) : setRepliesDisplayedCount(repliesDisplayedCount + 5)}>
                  Show more replies
                </h4>
            }
      </div>
    </div>
  );
}

export default PostNew;