import '../../assets/ForumApp.css';
import ForumPost from './ForumPost.js';
import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import {getPosts, reset}from "../../features/posts/postSlice";
import React  from 'react';
import Moment from 'react-moment';

function ForumMainPage(props) {

  const dispatch = useDispatch() 
  const navigate = useNavigate()

  const {user} = useSelector((state) => state.auth)

  const userCheck = () => {
    if (!user) {
      navigate('/login')
    } else {
      navigate('/forum/create')
    }
  }

  useEffect(() => {
    dispatch(getPosts()).then(() => dispatch(reset()))
  }, [dispatch])

  return (
    <div className="ForumMainPage">
      <div className="ForumButtons">
        <button onClick = {() => {userCheck()}}>Start a new thread </button>
        <button>Sort By: Latest [Functionality not added yet]</button>
      </div>
      <div className="ForumPostContainer">
        {props.posts.map((post, idx) => <ForumPost key={idx} title={post.title} likes={post.likes} 
        dislikes={post.dislikes} pinned={post.pinned} content={post.content} author={user.name} time={<Moment fromNow>{post.updatedAt}</Moment>} id={post._id}/>)}
      </div>
      
    </div>
  );
}

export default ForumMainPage;