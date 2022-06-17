import { Route, Routes} from 'react-router-dom';
import ForumMainPage from './ForumMainPage/ForumMainPage';
import ForumPostCreation from './ForumPostCreationPage/ForumPostCreation';
import {useSelector, useDispatch} from 'react-redux';
import ForumPostPage from './ForumPostPage/ForumPostPage';
import { useEffect } from 'react';
import {getPosts, reset}from "../features/posts/postSlice";


export default function ForumApp() {
    const {posts} = useSelector((state) => state.posts);
    const dispatch = useDispatch();

    useEffect(() => { 
      // posts dependency removed due to infinite loop
      const updatedBySorter = false;
      dispatch(getPosts({
        postLength: Object.keys(posts).length,
        updatedBySorter: updatedBySorter
      })).then(() => dispatch(reset()))
    }, [dispatch])
    
    return (
      <>
        <Routes>
          <Route path="/" element={<ForumMainPage posts={posts} />} />
          <Route path="create" element={<ForumPostCreation />} /> 
          {posts.map((post) => <Route path = {"post" + post._id} key={post._id} element = {<ForumPostPage title={post.title} content={post.content} likes={post.likes} dislikes={post.dislikes} time={post.updatedAt}/>}/>)}
        </Routes>
      </>
    );
  }
  
