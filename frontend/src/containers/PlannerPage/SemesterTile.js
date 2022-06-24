import { faCirclePlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../assets/PlannerApp.css';
import { useState } from "react";
import ModuleTile from './ModuleTile';
import SearchOverlay from './SearchOverlay';
import { useDispatch } from 'react-redux';
import { deleteSemester, saveSemester } from "../../features/modules/moduleSlice";

function SemesterTile(props) {

  const dispatch = useDispatch()

  const deleteSemesterOnClick = () => {
    dispatch(deleteSemester(props.semesterId))
  }

  const saveSemesters = (e) => {
    console.log("changing")
    const saveData = {
      semesterId: props.semesterId,
      content: e.target.innerText
    }
    
    setEdited(true)
    dispatch(saveSemester(saveData))
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
          <FontAwesomeIcon icon={faTrashCan} className="delete-semester-icon" />
        </div>
        
      </div>
      <div className='SemesterTileBody'>
        {props.modules.map((module, idx) => <ModuleTile idx={idx} key={idx} semesterId={props.semesterId} module={module}/>)}
      </div>
      <div className='SemesterTileFooter' onClick={() => setSearching(!searching)}>
        <FontAwesomeIcon icon={faCirclePlus} />
      </div>
    </div>
  );
}

export default SemesterTile;