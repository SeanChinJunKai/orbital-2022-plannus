import { faThumbsDown, faThumbsUp, faThumbtack } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../assets/ForumApp.css';
import React, { useState } from "react";

function ForumPost(props) {
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);

  return (
    <div className="ForumPost">
        <div className='ForumPostHeader'>
            <h1>{props.title}</h1>
            {props.pinned === true ?
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
        <div className='ForumPostFooter'>
            <div className='ForumPostAuthorTitle'>
                <p>by {props.author} {props.time}</p>
            </div>
            <div className='ForumPostScore'>
                <div className="LikesContainer">
                    <FontAwesomeIcon icon={faThumbsUp} className="ScoreButton" id='LikeButton' style={liked ? {color:'green'} : {color:'initial'}} onClick={() => setLiked(!liked)}/>
                    <p>{liked ? props.likes + 1 : props.likes}</p>
                </div>
                <div className="DislikesContainer">
                    <FontAwesomeIcon icon={faThumbsDown} className="ScoreButton" id='DislikeButton' style={disliked ? {color:'red'} : {color:'initial'}} onClick={() => setDisliked(!disliked)}/>
                    <p>{disliked ? props.dislikes + 1 : props.dislikes}</p>
                </div>
            </div>
        </div>
    </div>
  );
}

export default ForumPost;