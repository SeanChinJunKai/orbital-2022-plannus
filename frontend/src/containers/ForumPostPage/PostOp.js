import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faCaretUp, faCaretDown, faTrashCan, faPenToSquare, faEllipsisVertical, faFlag } from '@fortawesome/free-solid-svg-icons';
import '../../assets/ForumApp.css';
import {useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { deletePosts, dislikePosts, likePosts, reset, editPost} from '../../features/posts/postSlice';
import { toast } from 'react-toastify';
import LoadingIcons from 'react-loading-icons';


function PostOp(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { currentPost, isVotesLoading } = useSelector((state) => state.posts);
  const [changeContent, setChangeContent] = useState(`${currentPost.content}`)
  const [clicked, setClicked] = useState(false)
  const [showPostOptions, setShowPostOptions] = useState(false)
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!ref?.current?.contains(event.target)) {
        setShowPostOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
  }, [ref]);


  const onLike = (e) => {
    if (!user) {
        toast.error("You are not logged in.");
    }
    if (!user.verified) {
      toast.error("You have not verified your email.");
    }
    dispatch(likePosts(currentPost._id)).then(() => {
        dispatch(reset());
    });
  }

  const onDislike = (e) => {
      if (!user) {
          toast.error("You are not logged in.");
      }
      if (!user.verified) {
        toast.error("You have not verified your email.");
      }
      dispatch(dislikePosts(currentPost._id)).then(() => {
          dispatch(reset());
      });
  }
  const deleteUserPosts = (id) => {
      dispatch(deletePosts(id)).then(()=> dispatch(reset())).then(navigate('/forum'))
  }

  const editContent = (content) => {
    if (content) {
      dispatch(editPost(content)).then(()=>dispatch(reset()))
    } else {
      setChangeContent(currentPost.content);
    }
    setClicked(!clicked)
  }

  const changeContentText = (e) => {
      setChangeContent(e.target.value)
  }


  return (
    <div className="PostOp">
        <div className='VoteButtons'>
          <FontAwesomeIcon role="button" icon={faCaretUp} onClick={onLike} className="UpvoteBtn" style={user && props.likes.includes(user._id) ? {color:'var(--color-accept)'} : {color:'inherit'}} />
          {isVotesLoading ? <LoadingIcons.ThreeDots width="2rem" fill="#000000" /> : <h3>{props.likes.length - props.dislikes.length}</h3>}
          <FontAwesomeIcon role="button" icon={faCaretDown} onClick={onDislike} className="DownvoteBtn" style={user && props.dislikes.includes(user._id) ? {color:'var(--color-remove)'} : {color:'inherit'}} />
        </div>
        <div className='PostOpContent'>
          <div className='PostOpAuthorContainer'>
            <img className='OpIcon' src={props.profileImage ? props.profileImage : 'https://res.cloudinary.com/dqreeripf/image/upload/v1656242180/xdqcnyg5zu0y9iijznvf.jpg'} alt='user profile' />
            <h6> by {props.author} {props.time}</h6>


            <div className='more-options-btn-vertical' ref={ref}  onClick={() => setShowPostOptions(!showPostOptions)}>
              <FontAwesomeIcon icon={faEllipsisVertical}/>
              {
                showPostOptions 
                ? <div className='post-options-container' >
                    {
                      user.name === props.author
                      ? <>
                          <span onClick = {() => deleteUserPosts(currentPost._id)}>
                            <FontAwesomeIcon className="deleteIcon" icon={faTrashCan} />
                            Delete
                          </span>
                          
                          <span onClick = {() => setClicked(!clicked)}>
                        
                            <FontAwesomeIcon className="editIcon" icon={faPenToSquare}  />
                            Edit
                          </span>
                        </>
                      : <span onClick={() => navigate('/report')}>
                          <FontAwesomeIcon className="deleteIcon" icon={faFlag} />
                          Report
                        </span>
                    }
                  </div> 
                : <></>
              }
            </div>
          </div>
          
          <h3>{props.title}</h3>
          <div>
            {
              !clicked 
              ? props.content 
              : <div className='edit-container'>
                  <textarea 
                    autoFocus 
                    onFocus={(e) => e.target.setSelectionRange(changeContent.length, changeContent.length)} 
                    className='edit-area' 
                    defaultValue={changeContent} 
                    onChange={changeContentText}>
                  </textarea>
                  <div className='edit-btn-container'>
                    <input onClick={() => editContent(changeContent)} value='Save' required type="submit" />
                    <input onClick={() => setClicked(!clicked)} value='Cancel' required type="button" />
                  </div>
                  
                </div>
            }
          </div>
          {
            props.images.map(imageUrl =>
              <img className='forum-post-img' src={imageUrl} alt='post media' />
            )
          }
          <div className='PostOpFooter'>
            <h4><FontAwesomeIcon icon={faCommentDots} className="CommentIcon" /> {props.comments.length} Comments</h4>
            
          </div>
        </div>
        
    </div>
  );
}

export default PostOp;