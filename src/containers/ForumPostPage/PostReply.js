import '../../assets/ForumApp.css';
import { faKiwiBird, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../assets/ForumApp.css';
import { useState } from "react";
import PostComment from './PostComment';

function PostReply(props) {
  
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [commenting, setCommenting] = useState(false);
    return (
        <div className="PostNew">
          <div className='PostNewHeader'>
            <div className='PostNewIcon'>
              <FontAwesomeIcon icon={faKiwiBird} />
            </div>
            <h5 className='PostNewAuthor'>Rooster</h5>
            <h5 className='PostNewTime'>8 hr. ago</h5>
          </div>
          <div className='PostNewContent'>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
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
            
    
            <button onClick={() => setCommenting(!commenting)}>Reply</button>
            <button>Report</button>
          </div>
          {commenting ? <PostComment /> : <></>}
        </div>
      );
}

export default PostReply;