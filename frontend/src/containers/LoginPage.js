import {useState, useEffect} from 'react' 
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {login, reset} from "../features/auth/authSlice"
import Spinner from '../components/Spinner'
import '../assets/Login.css';
import { Button, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import teamLogo from '../assets/PlanNUS.png'



export default function LoginPage() {
  const[formData, setFormData] = useState({
      email:'',
      password2: '' // Confirm password
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

  if(isLoading) {
      return <Spinner />
  }


  return (
  <div className='LoginPage'>
    <div className='container'>
        <section className='heading'>
            <img src={teamLogo} alt='PlanNUS Logo'/>
        </section>
        <section className = "form">
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                <input 
                        type = 'email' 
                        className ='form-control' 
                        id='email' 
                        name = 'email' 
                        value = {email} 
                        placeholder='Enter your email' 
                        onChange = {onChange}/>
                </div>
                <div className='form-group'>
                <input 
                        type = 'password' 
                        className ='form-control' 
                        id='password' 
                        name = 'password' 
                        value = {password} 
                        placeholder='Enter your password' 
                        onChange = {onChange}/>
                </div>
                <div className='button'>
                    <button type="submit" className='btn btn-block'>Submit</button>
                </div>
            </form>
        </section>
    </div>
</div>)
  
}


