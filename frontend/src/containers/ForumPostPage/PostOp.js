import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDemocrat, faCommentDots, faCaretUp, faCaretDown, faLeftLong } from '@fortawesome/free-solid-svg-icons';
import '../../assets/ForumApp.css';
import { useState } from "react";
import { Link } from 'react-router-dom';


function PostOp(props) {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [votes, setVotes] = useState(props.likes - props.dislikes);
  return (
    <div className="PostOp">
        <div className='VoteButtons'>
          <FontAwesomeIcon role="button" icon={faCaretUp} className="UpvoteBtn" style={liked ? {color:'green'} : {color:'initial'}} onClick={() => {
            if (disliked) {
              setVotes(votes + 2);
              setDisliked(!disliked);
              setLiked(!liked);
            } else {
              setLiked(!liked);
              if (liked) {
                setVotes(votes - 1);
              } else {
                setVotes(votes + 1);
              }
              
            }}}/>
          <h3>{votes}</h3>
          <FontAwesomeIcon role="button" icon={faCaretDown} className="DownvoteBtn" style={disliked ? {color:'red'} : {color:'initial'}} onClick={() => {
            if (liked) {
              setVotes(votes - 2);
              setDisliked(!disliked);
              setLiked(!liked);
            } else {
              setDisliked(!disliked);
              setVotes(votes - 1);
              if (disliked) {
                setVotes(votes + 1);
              } else {
                setVotes(votes - 1);
              }
            }}}/>
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