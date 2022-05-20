import { faUserAstronaut } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../assets/App.css';

function NavTrinket() {
    return (
      <div className="NavTrinket" id='NavTrinket'>
        <h3>John Doe</h3>
        <div className='TrinketIconContainer'>
          <FontAwesomeIcon icon={faUserAstronaut} className='TrinketIcon'/>
        </div>
        <h4>Home</h4>
        <h4>Account</h4>
        <h4>Logout</h4>
      </div>
    );
  }
  
  export default NavTrinket;