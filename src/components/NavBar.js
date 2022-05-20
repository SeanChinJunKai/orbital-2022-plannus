import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from '@fortawesome/free-solid-svg-icons';

function NavBar() {
    return (
      <div className="NavBar">
          <h1>PlanNUS</h1>
          <div className="navIcon">
            <FontAwesomeIcon icon={faUser} />
          </div>
          
      </div>
    );
  }
  
  export default NavBar;