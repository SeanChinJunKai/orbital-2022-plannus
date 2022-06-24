import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../assets/PlannerApp.css';
import { checkGraduation, deleteModule } from '../../features/modules/moduleSlice';
import { useDispatch } from 'react-redux';


function ModuleTile(props) {

  const dispatch = useDispatch()

  const deleteModuleOnClick = () => {
    const deleteModuleData = {
      module : props.module,
      semesterId : props.semesterId
    }
    dispatch(deleteModule(deleteModuleData))
    dispatch(checkGraduation())
  }

  return (
    <div className="ModuleTile" style={{backgroundColor: props.module.color}}>
       <div className='tile-close-container'>
           <FontAwesomeIcon icon={faXmark} className="tile-close-button" onClick={deleteModuleOnClick}  />
       </div>
       <h5>{props.module.moduleCode}</h5>
       <h5>{props.module.moduleCredit} MC</h5>
    </div>
  );
}

export default ModuleTile;