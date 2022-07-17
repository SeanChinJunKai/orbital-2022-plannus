import '../../assets/ForumApp.css';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../assets/ForumApp.css';
import { useState } from "react";
import PostComment from './PostComment';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { dislikeReply, likeReply, reset } from '../../features/posts/postSlice';
import LoadingIcons from 'react-loading-icons';
import { useNavigate } from 'react-router-dom';

function PostReply(props) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [commenting, setCommenting] = useState(false);
    const updateCommenting = () => setCommenting(!commenting);
    const { user } = useSelector((state) => state.auth)
    const { isRepliesLoading } = useSelector((state) => state.posts)

    const onLikeReply = () => {
      if (!user) {
        toast.error("You are not logged in.");
      }
      if (!user.verified) {
        toast.error("You have not verified your email.");
    }
      dispatch(likeReply(props.replyId)).then(() => {
          dispatch(reset());
      });
    }
  
    const onDislikeReply = () => {
      if (!user) {
        toast.error("You are not logged in.");
      }
      if (!user.verified) {
        toast.error("You have not verified your email.");
      }
      dispatch(dislikeReply(props.replyId)).then(() => {
          dispatch(reset());
      });
  
    }

    return (
        <div className="PostReply PostNew">
          <div className='PostNewHeader'>
            <div className='PostNewIcon'>
              <img className='OpIcon' src={props.profileImage ? props.profileImage : 'https://res.cloudinary.com/dqreeripf/image/upload/v1656242180/xdqcnyg5zu0y9iijznvf.jpg'} alt='user profile' />
            </div>
            <h5 className='PostNewAuthor'>{props.author.name}</h5>
            <h5 className='PostNewTime'>{props.time}</h5>
          </div>
          <div className='PostNewContent'>
            <p>
              {props.content}
            </p>
          </div>
          <div className='PostNewFooter'>
            
            <div className='PostNewFooterVotes'>
            {
              isRepliesLoading
              ? <LoadingIcons.ThreeDots height="0.5rem" width="4.9rem" fill="#000000" />
              : <>
                  <FontAwesomeIcon icon={faThumbsUp} className="PostNewVoteIcon" id='LikeButton' 
                    style={user && props.likes.includes(user._id) ? {color:'green'} : {color:'initial'}} onClick={onLikeReply}/>
                  <h5 className='PostNewVoteIcon'>{props.likes.length}</h5>
                  <FontAwesomeIcon icon={faThumbsDown} className="PostNewVoteIcon" id='DislikeButton' 
                    style={user && props.dislikes.includes(user._id) ? {color:'red'} : {color:'initial'}} onClick={onDislikeReply}/>
                  <h5 className='PostNewVoteIcon'>{props.dislikes.length}</h5>
                </>
            }
              
            </div>
            

            <button onClick={updateCommenting}>Reply</button>
            <button onClick={() => navigate('/report')}>Report</button>
          </div>
          {commenting ? <PostComment commentId={props.commentId} commentAuthor={props.author} updateCommenting={updateCommenting} reply={true}/> : <></>}
        </div>
      );
}

export default PostReply;