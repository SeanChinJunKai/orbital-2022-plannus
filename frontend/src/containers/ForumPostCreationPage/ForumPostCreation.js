import '../../assets/ForumApp.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';


function ForumPostCreation() {
  const [length, setLength] = useState(0);
  const [file, setfile] = useState('');
  const maxLength = 80;
  return (
    <div className="ForumPostCreation">
      <form className='PostCreationForm'>
          <h1>Start a New Thread</h1>
          <div className='PostTitle'>
            <input type="text" name="title" id="title" placeholder='Title' required maxLength={maxLength} onChange={(e) => setLength(e.target.value.length)}></input>
            <div className='CharacterCount'>{length}/{maxLength}</div>
          </div>
          <div className='PostContent'>
            <textarea name="content" id="content" cols="30" rows="5" placeholder='Text (optional) [Note that functionality for new posts have not been added yet!] '></textarea>
          </div>
          <div className='Submissions'>
            <Link to='/forum'><button className='cancel-btn'>Cancel</button></Link>
            <div className='Attachments'>
              <label htmlFor="postattachments">Upload File</label>
              <span>{file}</span>
              <input type="file" name="postattachments" id="postattachments" onChange={(e) => setfile(e.target.files[0].name)}></input>
            </div>
            
            
            <input type="submit" name="submit" id="submit" value="Create Post"></input>
          </div>
          
      </form>
    </div>
  );
}

export default ForumPostCreation;