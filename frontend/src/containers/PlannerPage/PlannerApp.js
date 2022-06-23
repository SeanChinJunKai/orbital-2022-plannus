import '../../assets/PlannerApp.css';
import SemesterTile from './SemesterTile';
//import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns'
import {addSemester} from "../../features/modules/moduleSlice";
import { useDispatch, useSelector } from 'react-redux';

function PlannerApp(props) {

    const {semesters} = useSelector((state) => state.modules)
    const dispatch = useDispatch()
    
  return (
    <div className='PlannerContainer'>
        <div className='PlannerHeader'>
        
            <div className='planner-dropdown-container'>
                <select defaultValue={props.selected} name="courses" id="courses" onChange={e => props.setSelected(e.currentTarget.value)}>
                    <option value={-1} disabled className='placeholder-option'>Select A Course...</option>
                    {props.courseData.map((courseData, idx) => <option key={idx} selected={courseData.id === props.selected ? true : false} value={courseData.id}>{courseData.courseName}</option>)}
                </select>
            </div>
            
            
            <h1>Total MCs: 160</h1>
            <h1>Eligible for Graduation: Yes</h1>
        </div>
        <div className='PlannerBody'>
            {semesters.map((semester, idx) => <SemesterTile idx={idx} key={idx} title={semester.title} semesters={semesters}/>)}
        </div>
        <div className='PlannerFooter'>
            <h3><a href='default.com' onClick={(e) => {
                e.preventDefault();
                props.setRequirementsActive(!props.requirementsActive);
            }}>View Course Requirements</a></h3>
            <h3><a href='default.com' onClick={(e) => {
                e.preventDefault();
                dispatch(addSemester());
            }}>Add New Semester</a></h3>
        </div>
    </div>
    
  );
}

export default PlannerApp;