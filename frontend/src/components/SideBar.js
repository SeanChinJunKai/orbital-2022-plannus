import SideBarItem from './SideBarItem.js';
import { faCalendar, faComment, /*faGear,*/ faBug, faM } from '@fortawesome/free-solid-svg-icons';

function SideBar() {
  return (
    <div className="SideBar">
      <SideBarItem link="/planner" content="Planner" iconName={faCalendar}/>
      <SideBarItem link="/forum" content="Forum" iconName={faComment}/>
      {/*<SideBarItem link="/settings" content="Settings" iconName={faGear}/> TEMPORARILY REMOVED */}
      <SideBarItem link="/report" content="Report Issue" iconName={faBug}/>
      <SideBarItem link="/nusmods" content="NUSMods" iconName={faM}/>
    </div>
  );
}

export default SideBar;