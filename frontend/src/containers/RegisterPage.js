import {useState, useEffect} from 'react' 
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {register, reset} from "../features/auth/authSlice"
import Spinner from '../components/Spinner'
import '../assets/Login.css';

function RegisterPage() {
  const[formData, setFormData] = useState({
      name: '',
      email:'',
      password: '',
      password2: '' // Confirm password
  })

  const {name, email, password, password2} = formData

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

      if (password !== password2) {
          toast.error('Passwords do not match')
      } else {
          const userData = {name, email, password,}
          dispatch(register(userData))
      }
  }

  if(isLoading) {
      return <Spinner />
  }

  return (
    <div className='RegisterPage'>
        <div className='register-container'>
            <section className='register-heading'>
                <h1>Register</h1>
            </section>
            <section className="register-form-container">
                <form className='register-form' onSubmit={onSubmit}>
                    <div className='form-group'>
                        <input 
                            type = 'text' 
                            className ='form-control' 
                            id='name' 
                            name = 'name' 
                            value = {name} 
                            placeholder='Enter your name' 
                            onChange = {onChange}/>
                    </div>
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
                    <div className='form-group'>
                        <input 
                            type = 'password' 
                            className ='form-control' 
                            id='password2' 
                            name = 'password2' 
                            value = {password2} 
                            placeholder='Confirm password' 
                            onChange = {onChange}/>
                    </div>
                    <div className='register-buttons'>
                        <button type="submit">Register</button>
                    </div>
                </form>
            </section>
        </div>
    </div>
    )
}

export default RegisterPage