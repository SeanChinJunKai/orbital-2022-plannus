import '../../assets/ForumApp.css';
import ForumComment from './ForumComment.js';

function ForumPostPage(props) {
  return (
    <div className="ForumPostPage">
        <div className='ForumPostHeader'>
            <h1>{props.title}</h1>
        </div>
        <ForumComment />
    </div>
  );
}

export default ForumPostPage;