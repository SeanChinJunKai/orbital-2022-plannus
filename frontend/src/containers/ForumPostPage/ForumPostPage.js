import '../../assets/ForumApp.css';
import PostComment from './PostComment.js';
import PostOp from './PostOp';
import PostNew from './PostNew';
import { useState } from "react";
import Moment from 'react-moment';
import { useSelector} from 'react-redux'

function ForumPostPage(props) {

  // test comments, purely for development
  const comments = [{
    author: 'Rooster',
    time: '8 hr. ago',
    likes: 0,
    dislikes: 0,
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    replies: [{
      author: 'Rooster',
      time: '8 hr. ago',
      likes: 0,
      dislikes: 0,
      content: `Reply 1`
    }]
  }, {
    author: 'Snake',
    time: '8 hr. ago',
    likes: 0,
    dislikes: 0,
    content: `Lorem ipsum dolor sit amet`,
    replies: [{
      author: 'Rooster',
      time: '8 hr. ago',
      likes: 0,
      dislikes: 0,
      content: `Reply 2`
    }]
  }]

  const [postComments, setPostComments] = useState(comments);
  const updateComments = comment => {
    setPostComments([...postComments, comment]);
    console.log(postComments);
  }

  return (
    <div className="ForumPostPage">
      <div className='ForumPostPageContainer'>
        <PostOp title={props.title} likes={props.likes} dislikes={props.dislikes} pinned={true} 
        content={props.content}
        author={props.author} time={<Moment fromNow>{props.time}</Moment>} comments={postComments}/>
        <PostComment reply={false} updateComments={updateComments}/>
        {postComments.map((comment, idx) => <PostNew key={idx} replies={comment.replies} likes={comment.likes} dislikes={comment.dislikes} content={comment.content} author={comment.author} time={comment.time}/>)}
      </div>
        
    </div>
  );
}

export default ForumPostPage;