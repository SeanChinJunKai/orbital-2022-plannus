import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from '@fortawesome/free-solid-svg-icons';
import NavTrinket from './NavTrinket.js';
import { useState } from 'react';

function NavBar() {
  const [active, setActive] = useState(false);
    return (
      <div className="NavBar">
          <h1>PlanNUS</h1>
          <div className="navIcon" onClick={() => setActive(!active)}>
            <FontAwesomeIcon icon={faUser} />
          </div>
          {active ? <NavTrinket/> : <></>}
          
      </div>
    );
  }
  
  export default NavBar;