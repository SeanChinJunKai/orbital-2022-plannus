import axios from "axios";
import { useEffect, useState } from "react"
import { useParams} from 'react-router-dom'
import '../assets/NotifPage.css';
import errorLogo from '../assets/Error.png'
import successLogo from '../assets/Success.png'


function EmailVerifyPage() {
    const [validUrl, setValidUrl] = useState(false)
    const params = useParams();

    
    useEffect(() => {
        const verifyEmailUrl = async() => {
            try {  
                const url = `http://localhost:5200/api/users/${params.id}/verify/${params.token}`
                console.log(params)
                await axios.get(url)
                setValidUrl(true)
            } catch(error) {
                setValidUrl(false);
            }
        };
        verifyEmailUrl()  
    },[params])
    
    return (
        <>
            {validUrl ? 
                <div className = 'EmailVerifyPage'>
                    <img src={successLogo} alt='Success Logo'/>
                    <h1>Email Verified Successfully. You can now login!</h1>
                </div> :
                <div className = 'EmailVerifyPage'>
                    <img src={errorLogo} alt='Error Logo'/>
                    <h1>404 Not Found</h1>
                </div>}
                    
        </>
    );
}

export default EmailVerifyPage