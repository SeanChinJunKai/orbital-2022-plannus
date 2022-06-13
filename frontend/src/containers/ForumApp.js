import { Route, Routes } from 'react-router-dom';
import ForumMainPage from './ForumMainPage/ForumMainPage';
import ForumPostCreation from './ForumPostCreationPage/ForumPostCreation';
import {useSelector} from 'react-redux';
import ForumPostPage from './ForumPostPage/ForumPostPage';


export default function ForumApp() {
    const {posts} = useSelector((state) => state.posts)

    return (
      <>
          <Routes>
            <Route path="/forum" element={<ForumMainPage posts={posts}/>} />
            <Route path="/forum/create" element={<ForumPostCreation />} /> 
            {posts.map((post) => <Route path = {"/forum/post" + post._id} element = {<ForumPostPage title = {post.title} content = {post.content}/>}/>)}
          </Routes>
      </>
    );
  }
  
