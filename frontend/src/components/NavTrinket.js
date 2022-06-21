import { faUserAstronaut } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch} from 'react-redux';
import '../assets/App.css';
import { Link } from 'react-router-dom';
import {logout} from "../features/auth/authSlice"

function NavTrinket(props) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const logoutFunc = () => { 
    props.setActive(!props.active)
    dispatch(logout(user))
  };
    return (
      <div className="NavTrinket" id='NavTrinket'>
        <h3>{user ? user.name  : 'Not Logged In'}</h3>
        <div className='TrinketIconContainer'>
          <FontAwesomeIcon icon={faUserAstronaut} className='TrinketIcon'/>
        </div>
        <Link to='/' onClick={() => props.setActive(!props.active)}>Home</Link>
        
        {
          !user 
          ? <>
              <Link to='/login' onClick={() => props.setActive(!props.active)}>Login</Link>
              <Link to='/register' onClick={() => props.setActive(!props.active)}>Register</Link>
            </>
          : <>
              <Link to='/settings' onClick={() => props.setActive(!props.active)}>Account</Link>
              <Link to='/' onClick= {logoutFunc}>Logout</Link>
            </>
        }
      </div>
    );
  }
  
  export default NavTrinket;