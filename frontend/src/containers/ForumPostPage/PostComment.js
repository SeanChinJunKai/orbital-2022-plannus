import '../../assets/ForumApp.css';

function PostComment(props) {
  return (
    <form className="PostComment">
      <h6>Comment as Anonymous</h6>
      <textarea cols="30" rows="5" placeholder='What are your thoughts?'></textarea>
      <input type="submit" value="Post Comment"/>
    </form>
  );
}

export default PostComment;