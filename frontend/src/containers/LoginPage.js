import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {login, reset} from "../features/auth/authSlice";
import Spinner from '../components/Spinner';
import '../assets/Login.css';
import teamLogo from '../assets/PlanNUS.png';



export default function LoginPage() {
  const[formData, setFormData] = useState({
      email:'',
      password: ''
  })

  const {email, password} = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

  useEffect(() => {
    if (isError) {
        toast.error(message)
    }

    if (isSuccess || user) {
        navigate('/')
    }
    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
      setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
      }))
  }

  const onSubmit = (e) => {
      e.preventDefault()

      const userData = {
          email,
          password
      }
      dispatch(login(userData))
      
  }

  const [showPassword, setShowPassword] = useState(false);

  if(isLoading) {
      return <Spinner />
  }


  return (
    <div className='LoginPage'>
        <div className='login-container'>
            <section className='login-heading'>
                <img src={teamLogo} alt='PlanNUS Logo'/>
            </section>
            <section className="login-form-container">
                <form onSubmit={onSubmit} className='login-form'>
                    <div className='form-group'>
                        <input 
                            type = 'email' 
                            className ='form-control' 
                            id='email' 
                            name = 'email' 
                            value = {email} 
                            placeholder='Email' 
                            onChange = {onChange}/>
                    </div>
                    <div className='form-group'>
                        <input 
                            type = {showPassword ? 'text' : 'password'} 
                            className ='form-control' 
                            id='password' 
                            name = 'password' 
                            value = {password} 
                            placeholder='Password' 
                            onChange = {onChange}/>
                    </div>
                    <div className='show-password'>
                        <input type="checkbox" id="show" name="show" value="show" onClick={() => setShowPassword(!showPassword)}/> Show Password
                    </div>
                    <div className='login-buttons'>
                        <Link to='/Register'>Register</Link>
                        {/*<Link to='/Forgot'>Forgot Password?</Link>
                            To be updated*/}
                        <button type="submit">Login</button>
                    </div>
                </form>
            </section>
        </div>
    </div>
    )
  
}