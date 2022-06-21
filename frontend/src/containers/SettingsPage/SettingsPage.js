import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import '../../assets/Settings.css';
import '../../assets/App.css';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { getUserPosts, reset }from "../../features/posts/postSlice";
import { updateUserImage, reset as resetUser }from "../../features/auth/authSlice";

function SettingsPage(props) {
    const { user } = useSelector((state) => state.auth);
    const { userPosts } = useSelector((state) => state.posts);
    
    const dispatch = useDispatch();
    
    const [file, setfile] = useState("");

    // retrieve posts by user
    useEffect(() => {
        if (user) {
            dispatch(getUserPosts(user._id)).then(dispatch(reset()));
        }
    }, [user, dispatch])



    const [passwordData, setPasswordData] = useState({
        password: '',
        password2: '' // Confirm password
    })

    const onChangePassword = (e) => {
        setPasswordData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const [emailData, setEmailData] = useState({
        email: '',
    })

    const onChangeEmail = (e) => {
        setEmailData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const changePassword = (e) => {
        e.preventDefault()

        if (password !== password2) {
            toast.error('Passwords do not match')
        } else {
            
            // Add update password request here.
        }
    }

    const changeEmail = (e) => {
        e.preventDefault()
        // Add update email request here.
    }

    const updateProfileImage = (e) => {
        e.preventDefault();
        console.log("hi")
        // Add update profile request here.
        const formData = new FormData();
        formData.append("image", file);
        formData.append("userId", user._id);
        dispatch(updateUserImage(formData)).then(dispatch(resetUser()))
    }


    const updateImage = (e) => {
        setfile(e.target.files[0])
    }
  
    const {password, password2} = passwordData;
    const {email} = emailData;

  return (
    <div className='settings-page-container'>
        {
            user
            ? <>
                <h1 className='settings-page-header'>Profile</h1>
                <div className='settings-page-group'>
                    <h2 className='settings-page-subheader'>Profile Picture</h2>
                    
                    <form className='settings-change-container' encType='multipart/form-data' onSubmit={updateProfileImage}>
                        <div className='user-image-container'>
                            <img src={`./profileImages/${user.profileImage}`} alt='user profile' />
                        </div>
                        <label htmlFor="image">Upload File</label>
                        <input type="file" accept="image/*" name="image" id="image" onChange={updateImage}></input>
                        <button type="submit">Update</button>
                    </form>
                    <h2 className='settings-page-subheader'>Basic Information</h2>
                    <form className='settings-change-container'>
                        <h3>
                            Gender:
                            <select defaultValue={"Prefer not to say"/* to be obtained from user. user.gender */} name="gender" >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Prefer not to say">Prefer not to say</option>
                            </select>
                        </h3>
                        <button type="submit">Update</button>
                        <h3>
                            Matriculation Year: 
                            <select defaultValue={""/* to be obtained from user. user.matriculationYear */} name="matriculationYear" >
                                <option value={0}>No Matriculation Year Specified</option>
                                {
                                    [...Array(50).keys()].map(year => <option key={year + 2015} value={year + 2015}>{year + 2015}</option>)
                                }
                            </select>
                        </h3>
                        <button type="submit">Update</button>
                        <h3>
                            Major:
                            <select defaultValue={"No Major Specified"/* to be obtained from user. user.major */} name="matriculationYear" >
                                <option value="No Major Specified">No Major Specified</option>
                                {
                                    // To be mapped from API for courses.
                                    <option value={0}>Bachelor of Computing in Computer Science with Honours</option>
                                }
                            </select>
                        
                        </h3>
                        <button type="submit">Update</button>
                    </form>
                    
                    <h2 className='settings-page-subheader'>About</h2>
                    <form className='settings-change-container'>
                        <p>
                            {/* To be replaced with user.about */}
                            A cat at Western Michigan University with a focus in science. I grew up in a family of cats 
                            and know that cat is my calling. My passion for meowing has been evident in my 
                            involvement in Kalamazoo Public Schools and as a camp cat for the last three years. Through those experiences I 
                            have learned to interact with a diverse group of people, which has increased my ability to relate to others. I have also 
                            had the opportunity to create lessons for the campers that focused on life skills like teamwork, communication, and 
                            time management.
                        </p>
                        <textarea>

                        </textarea>
                        <button type="submit" onClick={changePassword}>Update</button>
                    </form>
                </div>
                <h1 className='settings-page-header'>Security</h1>
                <div className='settings-page-group'>
                    <h2 className='settings-page-subheader'>Change Password</h2>
                    <div className='settings-change-container'>
                        <input 
                            type = 'password' 
                            name = 'password' 
                            value = {password} 
                            placeholder='New Password' 
                            onChange = {onChangePassword}/>
                        <input 
                            type = 'password' 
                            name = 'password2' 
                            value = {password2} 
                            placeholder='Confirm New Password' 
                            onChange = {onChangePassword}/>
                        <button type="submit" onClick={changePassword}>Change</button>
                    </div>
                    <h2 className='settings-page-subheader'>Change Email</h2>
                    <div className='settings-change-container'>
                        <h3>Current email: {user.email}</h3>
                        <input 
                            type = 'email' 
                            name = 'email' 
                            value = {email} 
                            placeholder='New Email' 
                            onChange = {onChangeEmail}/>
                        <button type="submit" onClick={changeEmail}>Change</button>
                    </div>
                </div>
                <h1 className='settings-page-header'>Activity</h1>
                <div className='settings-page-group'>
                    <h2 className='settings-page-subheader'>Posts</h2>
                    {
                        userPosts
                        ? userPosts.map(post =>
                            <div className='user-post' key={post._id}>
                                <Link to={`/forum/${post._id}`}>
                                    {post.title} <strong>({post.likes.length} upvotes, {post.dislikes.length} downvotes)</strong>
                                </Link>
                            </div>
                            )
                        : <p>No posts created yet.</p>
                    }
                </div>
              </>
            : <></>
        }
        <h1 className='settings-page-header'>Settings</h1>
        <div className='settings-page-group'>
            <h2 className='settings-page-subheader'>Dark Mode</h2>
            <div className='settings-toggle-container'>
                <p>
                    Dark mode turns the light surfaces of the page dark, creating an experience ideal for the dark. Try it out!
                </p>
                <label className="switch">
                    <input type="checkbox" onClick={props.toggleDarkMode}/>
                    <span className="slider round"></span>
                </label>
            </div>
            
        </div>
    </div>
  )
}

export default SettingsPage