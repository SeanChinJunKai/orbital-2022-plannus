import { useEffect} from "react"
import { useParams, useNavigate} from 'react-router-dom'
import '../assets/NotifPage.css';
import {useDispatch} from 'react-redux'
import {verifyUser, reset} from "../features/auth/authSlice";
function EmailVerifyPage() {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const verifyEmailUrl = async() => {
            try {  
                const id = params.id
                const token = params.token
                const userData = {id, token}
                dispatch(verifyUser(userData)).then(() => dispatch(reset())).then(navigate('/'))
            } catch(error) {
                navigate('/badpage')
            }
        };
        verifyEmailUrl() 

    },[params, dispatch, navigate])
    
    return (
        <>
        </>
    );
}

export default EmailVerifyPage