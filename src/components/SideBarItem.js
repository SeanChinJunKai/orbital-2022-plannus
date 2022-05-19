import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function SideBarItem(props) {
    return (
      <a href={props.link} className="SideBarItem">
        <FontAwesomeIcon className="SideBarIcon" icon={props.iconName} />
        <p className='SideBarText'>{props.content}</p>
      </a>
    );
  }
  
  export default SideBarItem;