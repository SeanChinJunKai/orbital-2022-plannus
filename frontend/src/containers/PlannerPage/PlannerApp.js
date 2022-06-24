import '../../assets/PlannerApp.css';
import SemesterTile from './SemesterTile';
import { useSelector, useDispatch } from 'react-redux';
import { addSemester, clearSemesters } from "../../features/modules/moduleSlice"


function PlannerApp(props) {
    const {semesters, canGraduate } = useSelector(state => state.modules)
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

    const clearSemestersOnClick = (e) => {
        e.preventDefault();
        dispatch(clearSemesters())
    }
    
    const changeEv = (e) => {
        props.setSelected(e.currentTarget.value)
        console.log(e.currentTarget.value)
    }

    
    
    return (
    <div className='PlannerContainer'>
        <div className='PlannerHeader'>
        
            <div className='planner-dropdown-container'>
                <select defaultValue={props.selected} name="courses" id="courses" onChange={e => changeEv(e)}>
                    <option value={-1} disabled className='placeholder-option'>Select A Course...</option>
                    {props.courseData.map((courseData, idx) => <option key={idx} value={idx}>{courseData.title}</option>)}
                </select>
            </div>
            
            
            <h1>Total MCs: {semesters.reduce((prev, curr) => prev + (curr.modules.reduce((acc, currValue) => acc + currValue.moduleCredit, 0)), 0)}</h1>
            <h1>Eligible for Graduation: {canGraduate ? "Yes" : "No"}</h1>
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
            <h3><a href='default.com' onClick={clearSemestersOnClick}>Clear All Semester Data</a></h3>
            <h3><a href='default.com' onClick={addSemestersOnClick}>Add New Semester</a></h3>
        </div>
    </div>
    
  );
}

export default PlannerApp;