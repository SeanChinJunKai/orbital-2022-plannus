
import NavTrinket from './NavTrinket.js';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function NavBar() {

  const { user } = useSelector((state) => state.auth)
  const [active, setActive] = useState(false);
    return (
      <div className="NavBar">
          <Link to='/'>PlanNUS</Link>
          <div className="navIcon" onClick={() => setActive(!active)}>
            <img className='TrinketIcon' src={`/profileImages/${user && user.profileImage ? user.profileImage : 'default.jpg'}`} alt='user profile' />
          </div>
          {active ? <NavTrinket active={active} setActive={setActive} /> : <></>}
          
      </div>
    );
  }
  
  export default NavBar;