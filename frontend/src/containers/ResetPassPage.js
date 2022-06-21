import {useState, useEffect} from 'react' 
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import {resetPassword, login, reset} from "../features/auth/authSlice"
import '../assets/Login.css';

export default function ResetPassPage() {
    const[resetData, setResetData] = useState({
        token: '',
        password: '',
        password2: '',
    })

    const {token, password, password2} = resetData

  
    const navigate= useNavigate()
    const dispatch = useDispatch()
  
    const {user, resetEmail, isError, isSuccess, message} = useSelector((state) => state.auth)
  
    useEffect(() => {
      if (isError) {
          toast.error(message)
      }
  
      if (isSuccess || user) {
          navigate('/')
      }
      dispatch(reset())
    }, [user, isError, isSuccess, message, dispatch, navigate])
  
    const onChange = (e) => {
        setResetData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
  
    const onSubmit = (e) => {
        e.preventDefault()
        if (password !== password2) {
            toast.error('Passwords do not match')
        } else {
            const resetData = {token, password}
            const userData = {resetEmail, password}
            dispatch(resetPassword(resetData)).then(login(userData))
        }
    }
  
    return (
      <div className='RegisterPage'>
          <div className='register-container'>
              <section className='register-heading'>
                  <h1>Reset Password</h1>
              </section>
              <section className="register-form-container">
                  <form className='register-form' onSubmit={onSubmit}>
                  <div className='form-group'>
                          <input 
                              type = 'token' 
                              className ='form-control' 
                              id='token' 
                              name = 'token' 
                              value = {token} 
                              placeholder='Enter your token' 
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
                        <button type="submit">Reset your password</button>
                    </div>
                  </form>
              </section>
          </div>
      </div>
      )
}