import '../../assets/ForumApp.css';
import ForumPost from './ForumPost.js';
import {Link, useNavigate} from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import {getPosts, reset, sortByLikes, sortByComments, sortByTime }from "../../features/posts/postSlice";
import React, { useEffect }  from 'react';
import Moment from 'react-moment';
import Spinner from '../../components/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSmileBeam, faFire, faImage, faSprayCanSparkles } from '@fortawesome/free-solid-svg-icons';

function ForumMainPage(props) {
  
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const {user} = useSelector((state) => state.auth)
  const {isLoading, hasMorePosts, sortBy } = useSelector((state) => state.posts)


  useEffect(() => {
    window.onscroll = () => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && hasMorePosts) {
        const updatedBySorter = false;
        dispatch(getPosts({
          postLength: Object.keys(props.posts).length,
          updatedBySorter: updatedBySorter
        })).then(() => dispatch(reset()))
     }
    }

    return () => {window.onscroll = null}
  })

  const sortByLikesOnclick = () => {
    const updatedBySorter = true;
    dispatch(sortByLikes())
    dispatch(getPosts({
      postLength: Object.keys(props.posts).length,
      updatedBySorter: updatedBySorter
    })).then(() => dispatch(reset()))
  }

  const sortByCommentsOnclick = () => {
    const updatedBySorter = true;
    dispatch(sortByComments())
    dispatch(getPosts({
      postLength: Object.keys(props.posts).length,
      updatedBySorter: updatedBySorter
    })).then(() => dispatch(reset()))
  }

  const sortByTimeOnclick = () => {
    const updatedBySorter = true;
    dispatch(sortByTime())
    dispatch(getPosts({
      postLength: Object.keys(props.posts).length,
      updatedBySorter: updatedBySorter
    })).then(() => dispatch(reset()))
  }
  

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
        <div className="new-thread-container forum-group">
          <div className='new-thread-user-icon'>
            <Link to='/settings'>
              <img src={`/profileImages/${user && user.profileImage ? user.profileImage : 'default.jpg'}`} alt='user profile' />
            </Link>
          </div>
          <textarea onClick={userCheck} placeholder='Create a new thread' style={{'resize' : 'none'}}></textarea>
          <div className='new-thread-attachments' onClick={userCheck}><FontAwesomeIcon icon={faImage} /></div>
      
        </div>
        <div className='sorting-buttons-container forum-group'>
          <button style={sortBy === 'Comments' ? {'color': '#0A2463', 'backgroundColor': '#E2E2E2'} : {}} onClick={sortByCommentsOnclick}>
            <FontAwesomeIcon icon={faFire} /> Most Commented
          </button>
          <button style={sortBy === 'Likes' ? {'color': '#0A2463', 'backgroundColor': '#E2E2E2'} : {}} onClick={sortByLikesOnclick}>
            <FontAwesomeIcon icon={faFaceSmileBeam} /> Most Liked
          </button>
          <button style={sortBy === 'Time' ? {'color': '#0A2463', 'backgroundColor': '#E2E2E2'} : {}} onClick={sortByTimeOnclick}>
            <FontAwesomeIcon icon={faSprayCanSparkles} /> Most Recent
          </button>
        </div>
        
        
      </div>
      <div className="ForumPostContainer">
        {props.posts.map((post, idx) => <ForumPost key={idx} title={post.title} likes={post.likes} comments={post.comments}
        dislikes={post.dislikes} pinned={post.pinned} content={post.content} author={post.user.name} time={<Moment fromNow>{post.createdAt}</Moment>} id={post._id}/>)}
        {isLoading ? <Spinner /> : <></>}
        {!hasMorePosts ? <h1 style={{"marginBottom": "1.5rem"}}>No more posts to display</h1> : <></>}
      </div>
      
    </div>
  );
}

export default ForumMainPage;