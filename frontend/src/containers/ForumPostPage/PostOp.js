import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDemocrat, faCommentDots, faCaretUp, faCaretDown, faLeftLong } from '@fortawesome/free-solid-svg-icons';
import '../../assets/ForumApp.css';
import { useState } from "react";
import { Link } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {likePosts, dislikePosts, reset}from "../../features/posts/postSlice";


function PostOp(props) {

  const {user} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(props.likes.includes(user._id));
  const [disliked, setDisliked] = useState(props.dislikes.includes(user._id));
  const [likes, setLikes] = useState(props.likes.length);
  const [dislikes, setDislikes] = useState(props.dislikes.length);
  const [votes, setVotes] = useState(props.likes.length - props.dislikes.length);
  
  const onLike = () => {
    const newLikes = liked ? likes - 1 : likes + 1;
    if (disliked) {
        setDislikes(dislikes - 1);
        setDisliked(!disliked);
    }
    setLikes(newLikes);
    setLiked(!liked);
    setVotes(likes-dislikes);
    dispatch(likePosts(props.id)).then(() => dispatch(reset()));
  }

  const onDislike = () => {
    const newDislikes = disliked ? dislikes - 1 : dislikes + 1;
    if (liked) {
        setLikes(likes - 1);
        setLiked(!liked);
    }
    setDislikes(newDislikes);
    setDisliked(!disliked);
    setVotes(likes-dislikes);
    dispatch(dislikePosts(props.id)).then(() => dispatch(reset()));
  }

  return (
    <div className="PostOp">
        <div className='VoteButtons'>
          <FontAwesomeIcon role="button" icon={faCaretUp} className="UpvoteBtn" style={liked ? {color:'green'} : {color:'initial'}} onClick={onLike}/>
          <h3>{votes}</h3>
          <FontAwesomeIcon role="button" icon={faCaretDown} className="DownvoteBtn" style={disliked ? {color:'red'} : {color:'initial'}} onClick={onDislike}/>
        </div>
        <div className='PostOpContent'>
          <div className='PostOpAuthorContainer'>
            <FontAwesomeIcon icon={faDemocrat} className="OpIcon"/>
            <h6> by {props.author} {props.time}</h6>
            <Link to='/forum'><FontAwesomeIcon icon={faLeftLong} className='back-icon' />Back to Forums</Link>
          </div>
          
          <h3>{props.title}</h3>
          <p>{props.content}</p>
          <div className='PostOpFooter'>
            <h4><FontAwesomeIcon icon={faCommentDots} className="CommentIcon" /> {props.comments.length} Comments</h4>
          </div>
        </div>
        
    </div>
  );
}

export default PostOp;