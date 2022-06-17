import { Route, Routes} from 'react-router-dom';
import ForumMainPage from './ForumMainPage/ForumMainPage';
import ForumPostCreation from './ForumPostCreationPage/ForumPostCreation';
import {useSelector} from 'react-redux';
import ForumPostPage from './ForumPostPage/ForumPostPage';


export default function ForumApp() {
    const {posts} = useSelector((state) => state.posts)
    return (
      <>
        <Routes>
          <Route path="/" element={<ForumMainPage posts={posts} />} />
          <Route path="create" element={<ForumPostCreation />} /> 
          {posts.map((post) => <Route path = {"post" + post._id} key={post._id} element = {<ForumPostPage title={post.title} content={post.content} likes={post.likes} dislikes={post.dislikes} time={post.updatedAt} id={post._id}/>}/>)}
        </Routes>
      </>
    );
  }
  
