import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from '@fortawesome/free-solid-svg-icons';
import NavTrinket from './NavTrinket.js';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  const [active, setActive] = useState(false);
    return (
      <div className="NavBar">
          <Link to='/'>PlanNUS</Link>
          <div className="navIcon" onClick={() => setActive(!active)}>
            <FontAwesomeIcon icon={faUser} />
          </div>
          {active ? <NavTrinket active={active} setActive={setActive} /> : <></>}
          
      </div>
    );
  }
  
  export default NavBar;