import '../assets/NotifPage.css';
import errorLogo from '../assets/Error.png'
function ErrorPage() {
    return (
        <div className = 'ErrorPage'>
            <img src={errorLogo} alt='Error Logo'/>
            <h1>404 Not Found</h1>
        </div>
    );
}

export default ErrorPage