import {useState, useEffect} from 'react' 
import {useSelector, useDispatch} from 'react-redux'
import {toast} from 'react-toastify'
import {resetEmail, reset} from "../features/auth/authSlice"
import '../assets/Login.css';
import { useNavigate } from 'react-router-dom';

export default function ForgetPassPage() {
    const[forgotData, setForgotData] = useState({
        email: ''
    })

    const {email} = forgotData

    const navigate = useNavigate()
    const dispatch = useDispatch()
  
    const {user, isError, isSuccess, message} = useSelector((state) => state.auth)
  
    useEffect(() => {
      if (isError) {
          toast.error(message)
      }
  
      if (isSuccess) {
          toast.success(message)
          navigate('/reset')
      }
      dispatch(reset())
    }, [user, isError, isSuccess, message, dispatch, navigate])
  
    const onChange = (e) => {
        setForgotData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
  
    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(resetEmail(email))
    }
  
    return (
      <div className='RegisterPage'>
          <div className='register-container'>
              <section className='register-heading'>
                  <h1>Forgot Password?</h1>
              </section>
              <section className="register-form-container">
                  <form className='register-form' onSubmit={onSubmit}>
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
                      <div className='register-buttons'>
                          <button type="submit">Get reset token</button>
                      </div>
                  </form>
              </section>
          </div>
      </div>
      )
}