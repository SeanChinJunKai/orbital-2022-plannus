import '../../assets/ForumApp.css';
import PostComment from './PostComment.js';
import PostOp from './PostOp';
import PostNew from './PostNew';
import { useEffect } from "react";
import Moment from 'react-moment';
import { useDispatch, useSelector} from 'react-redux'
import Spinner from '../../components/Spinner';
import {getSpecificPost, reset }from "../../features/posts/postSlice";
import { useParams } from 'react-router-dom';

function ForumPostPage(props) {

  // test comments, purely for development
  // const comments = [{
  //   author: 'Rooster',
  //   time: '8 hr. ago',
  //   likes: 0,
  //   dislikes: 0,
  //   content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  //             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  //             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  //             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  //   replies: [{
  //     author: 'Rooster',
  //     time: '8 hr. ago',
  //     likes: 0,
  //     dislikes: 0,
  //     content: `Reply 1`
  //   }]
  // }, {
  //   author: 'Snake',
  //   time: '8 hr. ago',
  //   likes: 0,
  //   dislikes: 0,
  //   content: `Lorem ipsum dolor sit amet`,
  //   replies: [{
  //     author: 'Rooster',
  //     time: '8 hr. ago',
  //     likes: 0,
  //     dislikes: 0,
  //     content: `Reply 2`
  //   }]
  // }]

  const params = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSpecificPost(params.id)).then(() => dispatch(reset()))
  }, [dispatch, params.id])

  const { currentPost } = useSelector((state) => state.posts);

  return (
    <div className="ForumPostPage">
      {
        currentPost !== null
        ? <div className='ForumPostPageContainer'>
            <PostOp title={currentPost.title} likes={currentPost.likes} dislikes={currentPost.dislikes} pinned={true} 
            content={currentPost.content}
            author={currentPost.user.name} time={<Moment fromNow>{currentPost.createdAt}</Moment>} comments={currentPost.comments}/>
            <PostComment reply={false} />
            {currentPost.comments.map((comment) => 
              <PostNew key={comment._id} id={comment._id} replies={comment.replies} likes={comment.likes.length} 
              dislikes={comment.dislikes.length} content={comment.content} author={comment.author.name} time={<Moment fromNow>{comment.createdAt}</Moment>}/>)
            }
          </div>
        : <Spinner />
      }
    </div>
  );
}

export default ForumPostPage;