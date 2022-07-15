import axios from "axios";
import { useEffect} from "react"
import { useParams, useNavigate} from 'react-router-dom'
import '../assets/NotifPage.css';
import {useDispatch} from 'react-redux'
import {getInfo, reset} from "../features/auth/authSlice";
function EmailVerifyPage() {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const verifyEmailUrl = async() => {
            try {  
                const url = `http://localhost:5200/api/users/${params.id}/verify/${params.token}`
                await axios.get(url)
                dispatch(getInfo(params.id)).then(() => dispatch(reset())).then(navigate('/'))
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