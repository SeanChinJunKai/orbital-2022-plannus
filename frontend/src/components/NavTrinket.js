import { faUserAstronaut } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../assets/App.css';
import { Link } from 'react-router-dom';

function NavTrinket(props) {
    return (
      <div className="NavTrinket" id='NavTrinket'>
        <h3>Not Logged In</h3>
        <div className='TrinketIconContainer'>
          <FontAwesomeIcon icon={faUserAstronaut} className='TrinketIcon'/>
        </div>
        <Link to='/' onClick={() => props.setActive(!props.active)}>Home</Link>
        <Link to='/me' onClick={() => props.setActive(!props.active)}>Account</Link>
        <Link to='/login' onClick={() => props.setActive(!props.active)}>Login</Link>
        <Link to='/register' onClick={() => props.setActive(!props.active)}>Register</Link>
      </div>
    );
  }
  
  export default NavTrinket;