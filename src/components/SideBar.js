import SideBarItem from './SideBarItem.js';
import { faCalendar, faComment, faGear, faBug, faM } from '@fortawesome/free-solid-svg-icons';

function SideBar() {
  return (
    <div className="SideBar">
      <SideBarItem link="#" content="Planner" iconName={faCalendar}/>
      <SideBarItem link="#" content="Forum" iconName={faComment}/>
      <SideBarItem link="#" content="Settings" iconName={faGear}/>
      <SideBarItem link="#" content="Report Issue" iconName={faBug}/>
      <SideBarItem link="https://nusmods.com/" content="NUSMods" iconName={faM}/>
    </div>
  );
}

export default SideBar;