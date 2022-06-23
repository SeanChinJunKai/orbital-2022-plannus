import '../../assets/PlannerApp.css';
import SemesterTile from './SemesterTile';
import { useSelector, useDispatch } from 'react-redux';
import { addSemester } from "../../features/modules/moduleSlice"


function PlannerApp(props) {
    const { semesters } = useSelector(state => state.modules)
    const dispatch = useDispatch();

    

    const addSemestersOnClick = (e) => {
        e.preventDefault();
        const newSemester = {
            title: 'Year ' + ((semesters.length + 1) % 2 === 0 ? Math.floor((semesters.length + 1) / 2) : Math.floor((semesters.length + 1) / 2) + 1)
            + ' Semester ' + (semesters.length % 2 + 1),
            modules: []
        }
        dispatch(addSemester(newSemester))
    }
    
  return (
    <div className='PlannerContainer'>
        <div className='PlannerHeader'>
        
            <div className='planner-dropdown-container'>
                <select defaultValue={props.selected} name="courses" id="courses" onChange={e => props.setSelected(e.currentTarget.value)}>
                    <option value={-1} disabled className='placeholder-option'>Select A Course...</option>
                    {props.courseData.map((courseData, idx) => <option key={idx} value={courseData.id}>{courseData.courseName}</option>)}
                </select>
            </div>
            
            
            <h1>Total MCs: {semesters.reduce((prev, curr) => prev + (curr.modules.reduce((acc, currValue) => acc + currValue.moduleCredit, 0)), 0)}</h1>
            <h1>Eligible for Graduation: Yes</h1>
        </div>
        
            
            {
             semesters.length > 0
             ? <div className='PlannerBody'>
                    {semesters.map((semester, idx) => <SemesterTile semesterId={idx} key={idx} title={semester.title} modules={semester.modules} />)}
                </div>
             : <h3>No semesters added yet. Click "Add New Semester" below to add one!</h3>
            }
        
        <div className='PlannerFooter'>
            <h3><a href='default.com' onClick={(e) => {
                e.preventDefault();
                props.setRequirementsActive(!props.requirementsActive);
            }}>View Course Requirements</a></h3>
            <h3><a href='default.com' onClick={addSemestersOnClick}>Add New Semester</a></h3>
        </div>
    </div>
    
  );
}

export default PlannerApp;