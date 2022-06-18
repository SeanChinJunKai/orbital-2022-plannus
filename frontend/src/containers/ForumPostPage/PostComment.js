import '../../assets/ForumApp.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useState } from "react";
import { toast } from 'react-toastify';
import { reset, addComment } from '../../features/posts/postSlice';


function PostComment(props) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [commentText, setCommentText] = useState('');
  const onClickAddComment = e => {
    e.preventDefault();
    if (commentText) {

      // add comment to post

      dispatch(addComment(commentText)).then(() => dispatch(reset()))

      // close comment window after submit, if it is a reply
      if (props.updateCommenting) {
        props.updateCommenting();
      }

      // reset commenting form
      document.getElementById('text').value = '';
      setCommentText('');
    } else {
      toast.error("Please add some content to your comment.")
    }
  };

  //update and retrieve textbox value
  const onChange = e => setCommentText(e.target.value);

  return (
    <form className="PostComment">
      {user
      ? <>
          <h6>{props.reply ? 'Replying to ' + props.commentAuthor : 'Commenting'} as {user.name}</h6>
          <textarea id='text' onChange={onChange} cols="30" rows="5" placeholder='What are your thoughts?'>{props.reply ? '@' + props.commentAuthor + ' ' : ''}</textarea>
          <input onClick={onClickAddComment} value='Post Comment' required type="submit" />
        </>
      : <h3>You are not logged in. <Link to='/login'>Login</Link> to {props.reply ? 'reply' : 'comment'}.</h3>
      }
    </form>
    
    
  );
}

export default PostComment;