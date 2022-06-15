import { faThumbsDown, faThumbsUp, faThumbtack } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../assets/ForumApp.css';
import { useState } from "react";
import { Link } from 'react-router-dom';
import {likePosts, dislikePosts, reset}from "../../features/posts/postSlice";
import {useDispatch} from 'react-redux';



function ForumPost(props) {

    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);

    const dispatch = useDispatch() 

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
                        <FontAwesomeIcon icon={faThumbsUp} className="ScoreButton" id='LikeButton' style={liked ? {color:'green'} : {color:'initial'}} onClick={() => {
                             dispatch(likePosts(props.id)).then(() => dispatch(reset()))
                        }}/>
                        <p>{props.likes}</p>
                    </div>
                    <div className="DislikesContainer">
                        <FontAwesomeIcon icon={faThumbsDown} className="ScoreButton" id='DislikeButton' style={disliked ? {color:'red'} : {color:'initial'}} onClick={() => {
                            dispatch(dislikePosts(props.id)).then(reset())
                        }}/>
                        <p>{props.dislikes}</p>
                    </div>
                </div>
            </div>
        </div>
  );
}

export default ForumPost;