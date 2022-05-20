import '../assets/ForumApp.css';
import ForumPost from './ForumPost.js';

function ForumMainPage() {
  return (
    <div className="ForumApp">
      <div className="ForumButtons">
        <button>Start a new thread</button>
        <button>Sort By: Latest</button>
      </div>
      <div className="ForumPostContainer">
        <ForumPost title="Need help with academic plan for CS" likes={3} dislikes={0} pinned={true} 
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit." author="Monkey" time="10 hours ago"/>
        <ForumPost title="Requesting help for academic plan" likes={2} dislikes={0} pinned={false} 
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit." author="Rabbit" time="11 hours ago"/>
        <ForumPost title="Reccommended academic plan for BZA" likes={2} dislikes={1} pinned={false} 
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit." author="Bear" time="14 hours ago"/>
        <ForumPost title="Academic plan suggestions for FASS" likes={4} dislikes={0} pinned={false} 
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit." author="Wolf" time="18 hours ago"/>
        <ForumPost title="Struggling with pre-requisites" likes={11} dislikes={3} pinned={false} 
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin finibus risus sapien, id 
        pellentesque eros auctor eu. Nam sit amet dolor at nulla scelerisque euismod finibus vitae magna. 
        Mauris at nibh vitae nisl rutrum pellentesque vel at velit. Sed id tristique lectus. Nam dictum 
        purus et nisi euismod, id fermentum justo tempus. Duis leo mauris, sollicitudin eleifend enim bibendum, 
        posuere sodales turpis. Nunc pharetra nisi sed mattis malesuada. Sed mollis auctor tortor, vel tempus 
        velit euismod eu. Pellentesque non aliquet sapien. Cras rutrum turpis vel venenatis varius. Maecenas 
        facilisis tellus eu semper lobortis. Vestibulum sodales eget risus a ornare. Phasellus ac ipsum at augue 
        dictum volutpat. Suspendisse potenti. Integer tempus pellentesque nulla facilisis ultricies. Maecenas sed 
        ligula et justo viverra auctor nec ut urna. Integer eu malesuada lectus. Sed vel hendrerit justo, sed 
        posuere felis. Duis vel tempus lacus ornare. In ornare imperdiet tellus, vitae venenatis felis accumsan eget. 
        Integer blandit sollicitudin ligula a tincidunt. Sed vitae nisi pulvinar, suscipit sapien ut, elementum 
        diam. Nullam ante nisi, tristique feugiat convallis ut, sagittis in diam. Ut molestie enim eget ullamcorper 
        volutpat. Pellentesque eget libero lorem. Maecenas fermentum lectus sed tortor efficitur viverra. 
        Etiam lobortis urna elit, a aliquam mauris accumsan eget.." 
        author="Cat" time="1 day ago"/>
      </div>
      
    </div>
  );
}

export default ForumMainPage;