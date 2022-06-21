import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import '../../assets/Settings.css';
import '../../assets/App.css';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { getUserPosts, reset }from "../../features/posts/postSlice";
import { updateUserDetails, updateUserImage, reset as resetUser }from "../../features/auth/authSlice";

function SettingsPage(props) {
    const { user, isSuccess, isError } = useSelector((state) => state.auth);
    const { userPosts } = useSelector((state) => state.posts);
    
    const dispatch = useDispatch();
    
    

    // retrieve posts by user
    useEffect(() => {
        if (user) {
            dispatch(getUserPosts(user._id)).then(dispatch(reset()));
        }
        
        if (isSuccess) {
            toast.success("Change successful")
        }

        if (isError) {
            toast.error("No changes specified")
        }
    }, [user, dispatch, isSuccess, isError])

    // change user information

    const [userData, setUserData] = useState({
        name: '',
        email:'',
        password: '',
        password2: '',
        gender: '',
        matriculationYear: 0,
        about: '',
        major: ''
    })

    const {email, password, password2, gender, matriculationYear, about, major} = userData

    const onChangeDetails = (e) => {
        setUserData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
        console.log(userData);
    }

    const changeDetails = (e) => {
        e.preventDefault()

        if (password !== password2) {
            toast.error('Passwords do not match')
        } else {
            dispatch(updateUserDetails(userData)).then(dispatch(resetUser()))
            setUserData({
                name: '',
                email:'',
                password: '',
                password2: '',
                gender: '',
                matriculationYear: 0,
                about: '',
                major: ''
            })
        }
    }

    // Change profile pic
    const [file, setfile] = useState(null);
    const [fileName, setFileName] = useState("");

    const updateProfileImage = (e) => {
        e.preventDefault();
        setFileName("")
        console.log("hi")
        // Add update profile request here.
        const formData = new FormData();
        formData.append("image", file);
        formData.append("userId", user._id);
        dispatch(updateUserImage(formData)).then(dispatch(resetUser()))
    }


    const updateImage = (e) => {
        setfile(e.target.files[0])
        setFileName(e.target.files[0].name)
    }

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
                            <img src={`./profileImages/${user.profileImage ? user.profileImage : 'default.jpg'}`} alt='user profile' />
                        </div>
                        <label htmlFor="image">Upload File</label>
                        <input type="file" accept="image/*" name="image" id="image" onChange={updateImage}></input>
                        <span>{fileName ? `Selected File: ${fileName}` : "Only accepts .jpg, .png extensions"}</span>
                        {fileName ? <button id="profile-change-btn" type="submit">Update</button> : <></>}
                    </form>
                    <h2 className='settings-page-subheader'>Basic Information</h2>
                    <form className='settings-change-container' onSubmit={changeDetails}>
                        <h3>
                            Gender:
                            <select name="gender" onChange={onChangeDetails} value={gender ? gender : user.gender}>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Prefer not to say">Prefer not to say</option>
                            </select>
                        </h3>
                        <button type="submit">Update</button>
                        <h3>
                            Matriculation Year: 
                            <select name="matriculationYear" onChange={onChangeDetails} value={matriculationYear ? matriculationYear : user.matriculationYear}>
                                <option value={0}>No Matriculation Year Specified</option>
                                {
                                    [...Array(50).keys()].map(year => <option key={year + 2015} value={year + 2015}>{year + 2015}</option>)
                                }
                            </select>
                        </h3>
                        <button type="submit">Update</button>
                        <h3>
                            Major:
                            <select name="major" onChange={onChangeDetails} value={major ? major : user.major}>
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
                    <form className='settings-change-container' onSubmit={changeDetails}>
                        <p>
                            {user.about}
                        </p>
                        <textarea name="about" value={about} onChange={onChangeDetails} placeholder="Add some information about yourself">
                        </textarea>
                        <button type="submit">Update</button>
                    </form>
                </div>
                <h1 className='settings-page-header'>Security</h1>
                <form className='settings-page-group' onSubmit={changeDetails}>
                    <h2 className='settings-page-subheader'>Change Password</h2>
                    <div className='settings-change-container'>
                        <input 
                            type = 'password' 
                            name = 'password' 
                            value = {password} 
                            placeholder='New Password' 
                            onChange = {onChangeDetails}/>
                        <input 
                            type = 'password' 
                            name = 'password2' 
                            value = {password2} 
                            placeholder='Confirm New Password' 
                            onChange = {onChangeDetails}/>
                        <button type="submit">Change</button>
                    </div>
                    <h2 className='settings-page-subheader'>Change Email</h2>
                    <div className='settings-change-container'>
                        <h3>Current email: {user.email}</h3>
                        <input 
                            type = 'email' 
                            name = 'email' 
                            value = {email} 
                            placeholder='New Email' 
                            onChange = {onChangeDetails}/>
                        <button type="submit">Change</button>
                    </div>
                </form>
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