import '../../assets/ForumApp.css';

function ForumPostCreation() {
  return (
    <div className="ForumPostCreation">
      <div className='PostCreationHeader'>
          <h1>Start a New Thread</h1>
      </div>
      <form className='PostCreationForm'>
          <div className='PostTitle'>
            <input type="text" name="title" id="title" placeholder='Title'></input>
          </div>
          <div className='PostContent'>
            <textarea name="content" id="content" cols="30" rows="5" placeholder='Text (optional)'></textarea>
          </div>
          <div className='Attachments'>
            <label for="postattachments">Attachments</label>
            <input type="file" name="postattachments" id="postattachments"></input>
          </div>
          <div className='Submissions'>
            <input type="button" name="submit" id="submit" value="Create Post"></input>
          </div>
          
      </form>
    </div>
  );
}

export default ForumPostCreation;