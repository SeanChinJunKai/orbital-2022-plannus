import '../assets/NotifPage.css';
import errorLogo from '../assets/Error.png'
function AccessBlockedPage() {
    return (
        <div className = 'ErrorPage'>
            <img src={errorLogo} alt='Error Logo'/>
            <h1>Access blocked since email has not been verified</h1>
        </div>
    );
}

export default AccessBlockedPage