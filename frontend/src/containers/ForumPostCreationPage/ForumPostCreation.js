import '../../assets/ForumApp.css';
import { useState, useEffect } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {createPosts, reset, updateSort}from "../../features/posts/postSlice";
import { toast } from 'react-toastify';

function ForumPostCreation() {
  const [postData, setPostData] = useState({
    title:'',
    content: ''
  })

  const {title, content} = postData

  const [length, setLength] = useState(0);
  const [fileName, setFileName] = useState('');
  const [files, setFiles] = useState([]);
  const maxLength = 80;

  const {isSuccess, isError, message} = useSelector((state) => state.posts)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess) {
      navigate('/forum')
    }
  }, [navigate, isError, message, isSuccess, dispatch])

  const onChange = (e) => {
    setPostData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
    }))
  }
  
  const updateFile = (e) => {
    setFiles(e.target.files)
    if (e.target.files.length === 1) {
      setFileName(e.target.files[0].name)
    } else {
      setFileName(`${e.target.files.length} files`)
    }
    
  }

const onSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData();
    Array.from(files).forEach(file => {
      formData.append("postattachments", file)
    })
    formData.append("title", title);
    formData.append("content", content);
    dispatch(createPosts(formData)).then(() => dispatch(updateSort())).then(() => dispatch(reset()))
}

  return (
    <div className="ForumPostCreation">
      <form onSubmit={onSubmit} className='PostCreationForm' encType='multipart/form-data'>
          <h1>Start a New Thread</h1>
          <div className='PostTitle'>
            <input type="text" name="title" id="title" placeholder='Title' required maxLength={maxLength} onChange={(e) => {onChange(e); setLength(e.target.value.length)}}></input>
            <div className='CharacterCount'>{length}/{maxLength}</div>
          </div>
          <div className='PostContent'>
            <textarea name="content" id="content" cols="30" rows="5" placeholder='Text' onChange={onChange}></textarea>
          </div>
          <div className='Submissions'>
            <Link to='/forum'><button className='cancel-btn'>Cancel</button></Link>
            
            <div className='Attachments'>
              <label htmlFor="postattachments">Upload File</label>
              <span>{fileName}</span>
              <input type="file" accept="image/*,video/*" multiple name="postattachments" id="postattachments" onChange={updateFile}></input>
            </div>
            
            <input type="submit" name="submit" id="submit" value="Create Post"></input>
          </div>
          
      </form>
    </div>
  );
}

export default ForumPostCreation;