import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../assets/PlannerApp.css';

function ModuleTile(props) {
  return (
    <div className="ModuleTile" style={{backgroundColor: props.color}}>
       <div className='tile-close-container'>
           <FontAwesomeIcon icon={faXmark} className="tile-close-button" onClick={() => {
               props.activeModules.splice(props.idx, 1);
               props.setModules(props.activeModules);
               props.setTotalCredits(props.totalCredits - props.credits);   
            }} />
       </div>
       <h5>{props.module}</h5>
       <h5>{props.credits} MC</h5>
    </div>
  );
}

export default ModuleTile;