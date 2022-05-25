import '../assets/App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';


function SideBarItem(props) {
    return (
      props.link === '/nusmods'
      ? <a href='https://nusmods.com' rel="noreferrer" target="_blank" className='SideBarItem'>
          <FontAwesomeIcon className="SideBarIcon" icon={props.iconName} />
          <p className='SideBarText'>{props.content}</p>
        </a>
        
      : <Link to={props.link} className="SideBarItem">
          <FontAwesomeIcon className="SideBarIcon" icon={props.iconName} />
          <p className='SideBarText'>{props.content}</p>
        </Link>
    );
  }
  
  export default SideBarItem;