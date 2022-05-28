import '../../assets/ForumApp.css';
import PostComment from './PostComment.js';
import PostOp from './PostOp';
import PostNew from './PostNew';
import { useState } from "react";

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
        <PostOp title="Need help with academic plan for CS" likes={3} dislikes={0} pinned={true} 
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Application is currently in development, there are no other posts as of yet." 
        author="Monkey" time="10 hours ago" comments={postComments}/>
        <PostComment reply={false} updateComments={updateComments} />
        {postComments.map((comment, idx) => <PostNew key={idx} replies={comment.replies} likes={comment.likes} dislikes={comment.dislikes} content={comment.content} author={comment.author} time={comment.time}/>)}
      </div>
        
    </div>
  );
}

export default ForumPostPage;