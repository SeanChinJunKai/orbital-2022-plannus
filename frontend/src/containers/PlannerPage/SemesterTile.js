import { faCirclePlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../assets/PlannerApp.css';
import { useState } from "react";
import ModuleTile from './ModuleTile';
import SearchOverlay from './SearchOverlay';

function SemesterTile(props) {
  // Random color generator, purely for development
  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const [searching, setSearching] = useState(false);

  // Test modules, purely for development
  const modules = [{
    code : "CS2030S",
    credits : 4,
    color: getRandomColor()
  }, {
    code : "CS2040S",
    credits : 4,
    color: getRandomColor()
  }, {
    code: "GEA1000",
    credits: 4,
    color: getRandomColor()
  }, {
    code: "CS2100",
    credits: 4,
    color: getRandomColor()
  }, {
    code: "ES2660",
    credits: 4,
    color: getRandomColor()
  }];

  const [activeModules, setModules] = useState(modules);
  const [totalCredits, setTotalCredits] = useState(modules.reduce((prev, curr) => prev + curr.credits, 0))

  return (
    <div className="SemesterTile">
      {searching ? <SearchOverlay totalCredits={totalCredits} setTotalCredits={setTotalCredits} activeModules={activeModules} setModules={setModules} semesterTitle={props.title} searching={searching} setSearching={setSearching} /> : <></>}
      <div className='SemesterTileHeader'>
        <h4>{props.title}</h4>
        <h5>{totalCredits} MC</h5>
        <div className='delete-container' onClick={() => props.setSemesters(props.semesters.filter(semester => semester.title !== props.title))}>
          <h5>Delete Semester</h5>
          <FontAwesomeIcon icon={faTrashCan} className="delete-semester-icon" />
        </div>
        
      </div>
      <div className='SemesterTileBody'>
        {activeModules.map((module, idx) => <ModuleTile idx={idx} key={idx} totalCredits={totalCredits} setTotalCredits={setTotalCredits} activeModules={activeModules} setModules={setModules} module={module.code} credits={module.credits} color={module.color}/>)}
      </div>
      <div className='SemesterTileFooter' onClick={() => setSearching(!searching)}>
        <FontAwesomeIcon icon={faCirclePlus} />
      </div>
    </div>
  );
}

export default SemesterTile;