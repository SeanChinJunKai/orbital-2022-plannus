import '../../assets/ForumApp.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useState } from "react";


function PostComment(props) {
  const { user } = useSelector((state) => state.auth);
  const [commentText, setCommentText] = useState('');
  const onClick = e => {
    e.preventDefault();
    const newComment = {
      author: user.name,
      time: '1 second ago',
      likes: 0,
      dislikes: 0,
      content: commentText,
      replies: []
    };
    if (commentText) {
      if (props.updateComments) {
        props.updateComments(newComment)
      }

      if (props.updateCommenting) {
        props.updateCommenting();
      }

      document.getElementById('text').value = '';
      setCommentText('');
    }
  };

  const onChange = e => setCommentText(e.target.value);

  return (
    <form className="PostComment">
      {user
      ? <>
          <h6>{props.reply ? 'Replying to ' + props.commentAuthor : 'Commenting'} as {user.name}</h6>
          <textarea id='text' onChange={onChange} cols="30" rows="5" placeholder='What are your thoughts?'>{props.reply ? '@' + props.commentAuthor + ' ' : ''}</textarea>
          <input onClick={onClick} value='Post Comment' required type="submit" />
        </>
      : <h3>You are not logged in. <Link to='/login'>Login</Link> to {props.reply ? 'reply' : 'comment'}.</h3>
      }
    </form>
    
    
  );
}

export default PostComment;