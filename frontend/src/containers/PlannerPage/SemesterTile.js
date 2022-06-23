import { faCirclePlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../assets/PlannerApp.css';
import { useState } from "react";
import ModuleTile from './ModuleTile';
import SearchOverlay from './SearchOverlay';
import {deleteSemester} from "../../features/modules/moduleSlice";
import { useDispatch} from 'react-redux';

function SemesterTile(props) {
  const [searching, setSearching] = useState(false);

  const dispatch = useDispatch()
  // Test modules, purely for development
  const modules = [];

  const [activeModules, setModules] = useState(modules);
  const [totalCredits, setTotalCredits] = useState(modules.reduce((prev, curr) => prev + curr.credits, 0))

  return (
    <div className="SemesterTile">
      {searching ? <SearchOverlay totalCredits={totalCredits} setTotalCredits={setTotalCredits} activeModules={activeModules} setModules={setModules} semesterTitle={props.title} searching={searching} setSearching={setSearching} /> : <></>}
      <div className='SemesterTileHeader'>
        <h4>{props.title}</h4>
        <h5>{totalCredits} MC</h5>
        <div className='delete-container' onClick={(e) => dispatch(deleteSemester(props.title))}>
          <h5>Delete Semester</h5>
          <FontAwesomeIcon icon={faTrashCan} className="delete-semester-icon" />
        </div>
        
      </div>
      <div className='SemesterTileBody'>
        {activeModules.map((module, idx) => <ModuleTile idx={idx} key={idx} totalCredits={totalCredits} setTotalCredits={setTotalCredits} activeModules={activeModules} setModules={setModules} module={module.moduleCode} credits={module.moduleCredit} color={module.color}/>)}
      </div>
      <div className='SemesterTileFooter' onClick={() => setSearching(!searching)}>
        <FontAwesomeIcon icon={faCirclePlus} />
      </div>
    </div>
  );
}

export default SemesterTile;