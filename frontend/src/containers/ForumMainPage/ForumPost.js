import { faThumbsDown, faThumbsUp, faThumbtack } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../assets/ForumApp.css';
import { Link } from 'react-router-dom';
import {likePosts, dislikePosts, reset} from "../../features/posts/postSlice";
import {useSelector, useDispatch} from 'react-redux';
import { toast } from 'react-toastify';

function ForumPost(props) {

    const {user} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const onLike = () => {
        if (!user) {
            toast.error("You are not logged in.");
        }
        dispatch(likePosts(props.id)).then(() => dispatch(reset()));
        
    }

    const onDislike = () => {
        if (!user) {
            toast.error("You are not logged in.");
        }
        dispatch(dislikePosts(props.id)).then(dispatch(reset()));
    }

    

  return (
        <div className="ForumPost">
            <Link to={'/forum/post' + props.id}  className='ForumPostMain'>
                <div className='ForumPostHeader'>
                    <h1>{props.title}</h1>
                    {props.pinned ?
                    (
                        <div className='pinContainer'>
                            <FontAwesomeIcon icon={faThumbtack}/>
                            <h1>Pinned</h1>
                        </div>
                    ) :
                    <></>}
                    
                </div>
                <div className='ForumPostContent'>
                    <p>
                    {props.content.length > 1000 ? props.content.substring(0, 1000) + " ..." : props.content}
                    </p>
                </div>
            </Link>
            
            <div className='ForumPostFooter'>
                <div className='ForumPostAuthorTitle'>
                    <p>by {props.author} {props.time}</p>
                </div>
                <div className='ForumPostScore'>
                    <div className="LikesContainer">
                        <FontAwesomeIcon icon={faThumbsUp} className="ScoreButton" id='LikeButton' style={user && props.likes.includes(user._id) ? {color:'green'} : {color:'initial'}} onClick={onLike}/>
                        <p>{props.likes.length}</p>
                    </div>
                    <div className="DislikesContainer">
                        <FontAwesomeIcon icon={faThumbsDown} className="ScoreButton" id='DislikeButton' style={user && props.dislikes.includes(user._id) ? {color:'red'} : {color:'initial'}} onClick={onDislike}/>
                        <p>{props.dislikes.length}</p>
                    </div>
                </div>
            </div>
        </div>
  );
}

export default ForumPost;