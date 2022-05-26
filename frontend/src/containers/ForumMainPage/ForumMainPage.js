import '../../assets/ForumApp.css';
import ForumPost from './ForumPost.js';
import { Link } from 'react-router-dom';

function ForumMainPage() {
  const posts = [{
    title : "Need help with academic plan for CS",
    likes : 3,
    dislikes : 0,
    pinned : true,
    content : "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    author : "Monkey",
    time : "10 hours ago"
  }, {
    title : "Requesting help for academic plan",
    likes : 2,
    dislikes : 0,
    pinned : false,
    content : "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    author : "Rabbit",
    time : "11 hours ago"
  }, {
    title : "Reccommended academic plan for BZA",
    likes : 2,
    dislikes : 1,
    pinned : false,
    content : "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    author : "Bear",
    time : "14 hours ago"
  }, {
    title : "Academic plan suggestions for FASS",
    likes : 4,
    dislikes : 0,
    pinned : false,
    content : "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    author : "Wolf",
    time : "18 hours ago"
  }, {
    title : "Struggling with pre-requisites",
    likes : 11,
    dislikes : 3,
    pinned : false,
    content : `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin finibus risus sapien, id pellentesque eros auctor eu.
     Nam sit amet dolor at nulla scelerisque euismod finibus vitae magna. Mauris at nibh vitae nisl rutrum pellentesque vel at velit.
     Sed id tristique lectus. Nam dictum purus et nisi euismod, id fermentum justo tempus. Duis leo mauris, sollicitudin eleifend enim
     bibendum, posuere sodales turpis. Nunc pharetra nisi sed mattis malesuada. Sed mollis auctor tortor, vel tempus velit euismod eu.
     Pellentesque non aliquet sapien. Cras rutrum turpis vel venenatis varius. Maecenas facilisis tellus eu semper lobortis. Vestibulum
     sodales eget risus a ornare. Phasellus ac ipsum at augue dictum volutpat. Suspendisse potenti. Integer tempus pellentesque nulla 
     facilisis ultricies. Maecenas sed ligula et justo viverra auctor nec ut urna. Suspendisse potenti. Integer tempus pellentesque nulla 
     facilisis ultricies. Maecenas sed ligula et justo viverra auctor nec ut urna. Suspendisse potenti. Integer tempus pellentesque nulla 
     facilisis ultricies. Maecenas sed ligula et justo viverra auctor nec ut urna.`,
    author : "Cat",
    time : "1 day ago"
  }]
  return (
    <div className="ForumMainPage">
      <div className="ForumButtons">
        <Link to="/forum/create"><button>Start a new thread</button></Link>
        <button>Sort By: Latest</button>
      </div>
      <div className="ForumPostContainer">
        {posts.map((post, idx) => <ForumPost key={idx} title={post.title} likes={post.likes} 
        dislikes={post.dislikes} pinned={post.pinned} content={post.content} author={post.author} time={post.time} />)}
      </div>
      
    </div>
  );
}

export default ForumMainPage;