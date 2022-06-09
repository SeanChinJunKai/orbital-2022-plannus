import '../../assets/ForumApp.css';
import ForumPost from './ForumPost.js';
import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {getPosts, reset}from "../../features/posts/postSlice";

function ForumMainPage() {

  const {posts} = useSelector((state) => state.posts)
  const {user} = useSelector((state) => state.auth)

  const dispatch = useDispatch() 
  const navigate = useNavigate()


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
        {posts.map((post, idx) => <ForumPost key={idx} title={post.title} likes={post.likes} 
        dislikes={post.dislikes} pinned={post.pinned} content={post.content} author={post.author} time={post.time} />)}
      </div>
      
    </div>
  );
}

export default ForumMainPage;