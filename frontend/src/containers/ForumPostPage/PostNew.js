import { faKiwiBird, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../assets/ForumApp.css';
import { useState } from "react";
import PostReply from './PostReply';
import PostComment from './PostComment';

function PostNew(props) {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [commenting, setCommenting] = useState(false);
  const [postReplies, setPostReplies] = useState(props.replies);
  const updateReplies = reply => setPostReplies([...postReplies, reply]);
  const updateCommenting = () => setCommenting(!commenting);
  
  return (
    <div className="PostNew">
      <div className='PostNewHeader'>
        <div className='PostNewIcon'>
          <FontAwesomeIcon icon={faKiwiBird} />
        </div>
        <h5 className='PostNewAuthor'>{props.author}</h5>
        <h5 className='PostNewTime'>{props.time}</h5>
      </div>
      <div className='PostNewContent'>
        <p>
          {props.content}
        </p>
      </div>
      <div className='PostNewFooter'>
        <div className='PostNewFooterVotes'>
          <FontAwesomeIcon icon={faThumbsUp} className="PostNewVoteIcon" id='LikeButton' style={liked ? {color:'green'} : {color:'initial'}} onClick={() => {
            setLiked(!liked);
            if (disliked) {
               setDisliked(!disliked);
            }}}/>
          <h5 className='PostNewVoteIcon'>{liked ? props.likes + 1 : props.likes}</h5>
          <FontAwesomeIcon icon={faThumbsDown} className="PostNewVoteIcon" id='DislikeButton' style={disliked ? {color:'red'} : {color:'initial'}} onClick={() => {
            setDisliked(!disliked);
            if (liked) {
               setLiked(!liked);
               }
            }}/>
          <h5 className='PostNewVoteIcon'>{disliked ? props.dislikes + 1 : props.dislikes}</h5>
        </div>
        

        <button onClick={updateCommenting}>Reply</button>
        <button>Report</button>
      </div>
      {commenting ? <PostComment commentAuthor={props.author} updateCommenting={updateCommenting} updateComments={updateReplies} reply={true}/> : <></>}
      <div className='PostNewRepliesContainer'>
        {/*postReplies.map((reply, idx) => 
          <PostReply key={idx} updateComments={updateReplies} likes={reply.likes} dislikes={reply.dislikes} content={reply.content} author={reply.author} time={reply.time}/>)*/}
      </div>
    </div>
  );
}

export default PostNew;