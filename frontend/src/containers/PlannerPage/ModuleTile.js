import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../assets/PlannerApp.css';
import { checkGraduation, deleteModule, reset} from '../../features/modules/moduleSlice';
import { updateUserPlanner, reset as resetUser } from '../../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { useDrag } from 'react-dnd';
import * as tinycolor from 'tinycolor2';
import { useEffect } from 'react';
import { getEmptyImage } from 'react-dnd-html5-backend';

function ModuleTile(props) {
  
  const dispatch = useDispatch()
  const [{isDragging}, drag, preview] = useDrag(() => ({
    type: "module",
    item: {
      module: props.module,
      semesterId: props.semesterId,
      idx: props.idx,
      darkMode: props.darkMode,
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    })
  }))

  useEffect(() => {
    preview(getEmptyImage())
  })

  const topLevelAction = () => dispatch => {
    return Promise.all([dispatch(reset()), dispatch(resetUser())])
  }

  const deleteModuleOnClick = () => {
    const deleteModuleData = {
      module : props.module,
      semesterId : props.semesterId
    }
    dispatch(deleteModule(deleteModuleData)).then(()=> dispatch(updateUserPlanner())).then(() => dispatch(checkGraduation())).then(()=> dispatch(topLevelAction))
  }

  return (
    <div ref={drag} className="ModuleTile" style={{backgroundColor: props.darkMode ? tinycolor(props.module.color).darken(20) : tinycolor(props.module.color).lighten(8), display: isDragging ? 'none' : 'initial'}}>
       <div className='tile-close-container'>
           <FontAwesomeIcon icon={faXmark} className="tile-close-button" onClick={deleteModuleOnClick}  />
       </div>
       <h5>{props.module.moduleCode}</h5>
       <h5>{props.module.moduleCredit} MC</h5>
    </div>
  );
}

export default ModuleTile;