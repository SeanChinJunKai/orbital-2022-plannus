import '../../assets/ForumApp.css';
import PostComment from './PostComment.js';
import PostOp from './PostOp';
import PostNew from './PostNew';

function ForumPostPage(props) {
  return (
    <div className="ForumPostPage">
      <div className='ForumPostPageContainer'>
        <PostOp title="Need help with academic plan for CS" likes={3} dislikes={0} pinned={true} 
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit." 
        author="Monkey" time="10 hours ago" comments={["test1", "test2"]}/>
        <PostComment />
        <PostNew likes={0} dislikes={0}/>
        <PostNew likes={3} dislikes={1}/>
        <PostNew likes={4} dislikes={2}/>
        <PostNew likes={11} dislikes={0}/>
        
      </div>
        
    </div>
  );
}

export default ForumPostPage;