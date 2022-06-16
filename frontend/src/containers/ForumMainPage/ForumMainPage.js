import '../../assets/ForumApp.css';
import ForumPost from './ForumPost.js';
import {useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import {getPosts, reset}from "../../features/posts/postSlice";
import React  from 'react';
import Moment from 'react-moment';
import { toast } from 'react-toastify';

function ForumMainPage(props) {
  const dispatch = useDispatch() 
  const navigate = useNavigate()

  const {user} = useSelector((state) => state.auth)
  const {isError, message} = useSelector((state) => state.posts);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    
    dispatch(getPosts()).then(() => dispatch(reset()))
  }, [isError, message, dispatch])

  const userCheck = () => {
    if (!user) {
      navigate('/login')
    } else {
      navigate('/forum/create')
    }
  }

  return (
    <div className="ForumMainPage">
      <div className="ForumButtons">
        <button onClick = {() => {userCheck()}}>Start a new thread </button>
        <button>Sort By: Latest</button>
      </div>
      <div className="ForumPostContainer">
        {props.posts.map((post, idx) => <ForumPost key={idx} title={post.title} likes={post.likes} 
        dislikes={post.dislikes} pinned={post.pinned} content={post.content} author={post.user.name} time={<Moment fromNow>{post.createdAt}</Moment>} id={post._id}/>)}
      </div>
      
    </div>
  );
}

export default ForumMainPage;