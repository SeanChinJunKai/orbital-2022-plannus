import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../assets/PlannerApp.css';
import { useState } from "react";
import ModuleTile from './ModuleTile';
import SearchOverlay from './SearchOverlay';
import { useDispatch } from 'react-redux';
import { checkGraduation, deleteSemester, saveSemester, reset } from "../../features/modules/moduleSlice";
import { updateUserPlanner, reset as resetUser } from '../../features/auth/authSlice';
import { Droppable } from "react-beautiful-dnd";

function SemesterTile(props) {

  const dispatch = useDispatch()

  const topLevelAction = () => dispatch => {
    return Promise.all([dispatch(reset()), dispatch(resetUser())])
  }

  const deleteSemesterOnClick = () => {
    dispatch(deleteSemester(props.semesterId)).then(()=> dispatch(updateUserPlanner())).then(() => dispatch(checkGraduation())).then(()=> dispatch(topLevelAction()))
  }

  const saveSemesters = (e) => {
    console.log("changing")
    const saveData = {
      semesterId: props.semesterId,
      content: e.target.innerText
    }
    
    setEdited(true)
    dispatch(saveSemester(saveData)).then(()=> dispatch(updateUserPlanner())).then(() => dispatch(checkGraduation())).then(()=> dispatch(topLevelAction()))
  }


  const [searching, setSearching] = useState(false);
  const [edited, setEdited] = useState(false)

  return (
    <div className="SemesterTile">
      {searching ? <SearchOverlay semesterId={props.semesterId}
      semesterTitle={props.title} searching={searching} setSearching={setSearching} /> : <></>}
      <div className='SemesterTileHeader'>
        <h4 onInput={saveSemesters} contentEditable={true} suppressContentEditableWarning={true}>{edited ? "" : props.title}</h4>
        <h5>{props.modules.reduce((prev, curr) => prev + curr.moduleCredit, 0)} MC</h5>
        <div className='delete-container' onClick={deleteSemesterOnClick}>
          <h5>Delete Semester</h5>
        </div>
        
      </div>
      <Droppable droppableId={`${props.semesterId}`} direction="horizontal">
        {
          (provided, snapshot) => (
            <div className='SemesterTileBody' {...provided.droppableProps} ref={provided.innerRef}>
              {props.modules.map((module, idx) => <ModuleTile idx={idx} key={module.moduleCode} semesterId={props.semesterId} module={module}/>)}
              <div style={{width: snapshot.isDragging ? '6rem' : 'initial'}}>{provided.placeholder}</div>
              
            </div>
          )
        }
        
      </Droppable>
      
      <div className='SemesterTileFooter' onClick={() => setSearching(!searching)}>
        <FontAwesomeIcon icon={faCirclePlus} />
      </div>
    </div>
  );
}

export default SemesterTile;