import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faCaretUp, faCaretDown, faLeftLong } from '@fortawesome/free-solid-svg-icons';
import '../../assets/ForumApp.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { dislikePosts, likePosts, reset } from '../../features/posts/postSlice';
import { toast } from 'react-toastify';
import LoadingIcons from 'react-loading-icons';


function PostOp(props) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { currentPost, isVotesLoading } = useSelector((state) => state.posts);
  
  const onLike = (e) => {
    if (!user) {
        toast.error("You are not logged in.");
    }
    if (!user.verified) {
      toast.error("You have not verified your email.");
    }
    dispatch(likePosts(currentPost._id)).then(() => {
        dispatch(reset());
    });
}

const onDislike = (e) => {
    if (!user) {
        toast.error("You are not logged in.");
    }
    if (!user.verified) {
      toast.error("You have not verified your email.");
    }
    dispatch(dislikePosts(currentPost._id)).then(() => {
        dispatch(reset());
    });
}

  return (
    <div className="PostOp">
        <div className='VoteButtons'>
          <FontAwesomeIcon role="button" icon={faCaretUp} onClick={onLike} className="UpvoteBtn" style={user && props.likes.includes(user._id) ? {color:'var(--color-accept)'} : {color:'inherit'}} />
          {isVotesLoading ? <LoadingIcons.ThreeDots width="2rem" fill="#000000" /> : <h3>{props.likes.length - props.dislikes.length}</h3>}
          <FontAwesomeIcon role="button" icon={faCaretDown} onClick={onDislike} className="DownvoteBtn" style={user && props.dislikes.includes(user._id) ? {color:'var(--color-remove)'} : {color:'inherit'}} />
        </div>
        <div className='PostOpContent'>
          <div className='PostOpAuthorContainer'>
            <img className='OpIcon' src={props.profileImage ? props.profileImage : 'https://res.cloudinary.com/dqreeripf/image/upload/v1656242180/xdqcnyg5zu0y9iijznvf.jpg'} alt='user profile' />
            <h6> by {props.author} {props.time}</h6>
            <Link to='/forum'><FontAwesomeIcon icon={faLeftLong} className='back-icon' />Back to Forums</Link>
          </div>
          
          <h3>{props.title}</h3>
          <p>{props.content}</p>
          {
            props.images.map(imageUrl =>
              <img className='forum-post-img' src={imageUrl} alt='post media' />
            )
          }
          <div className='PostOpFooter'>
            <h4><FontAwesomeIcon icon={faCommentDots} className="CommentIcon" /> {props.comments.length} Comments</h4>
          </div>
        </div>
        
    </div>
  );
}

export default PostOp;