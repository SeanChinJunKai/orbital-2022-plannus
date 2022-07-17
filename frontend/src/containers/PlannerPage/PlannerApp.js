import '../../assets/PlannerApp.css';
import SemesterTile from './SemesterTile';
import { useSelector, useDispatch } from 'react-redux';
import { addSemester, checkGraduation, clearSemesters, setSelectedIndex, reset} from "../../features/modules/moduleSlice"
import { updateUserPlanner, reset as resetUser } from '../../features/auth/authSlice';
import { useRef } from 'react';
import exportAsImage from '../../app/exportAsImage';

function PlannerApp(props) {
    const {canGraduate, requirements, selectedRequirementIndex } = useSelector(state => state.modules)
    const dispatch = useDispatch();
    const exportRef = useRef();

    const topLevelAction = () => dispatch => {
        return Promise.all([dispatch(reset()), dispatch(resetUser())])
    }

    const onCapture = (e) => {
        e.preventDefault();
        exportAsImage(exportRef.current, "academic_plan")
    }

    const addSemestersOnClick = (e) => {
        e.preventDefault();
        const newSemester = {
            title: 'Year ' + ((props.userPlanner.length + 1) % 2 === 0 ? Math.floor((props.userPlanner.length + 1) / 2) : Math.floor((props.userPlanner.length + 1) / 2) + 1)
            + ' Semester ' + (props.userPlanner.length % 2 + 1),
            modules: []
        }
        dispatch(addSemester(newSemester)).then(()=> dispatch(updateUserPlanner())).then(() => dispatch(checkGraduation())).then(() => dispatch(topLevelAction()))
    }

    const clearSemestersOnClick = (e) => {
        e.preventDefault();
        dispatch(clearSemesters()).then(()=> dispatch(updateUserPlanner())).then(() => dispatch(checkGraduation())).then(() => dispatch(topLevelAction()))
    }
    
    const changeEv = (e) => {
        dispatch(setSelectedIndex(e.currentTarget.value)).then(() => dispatch(checkGraduation())).then(() => dispatch(reset()))
    }
    
    
    return (
        <div className='PlannerContainer'>
            <div className='PlannerHeader'>
            
                <div className='planner-dropdown-container'>
                    <select defaultValue={selectedRequirementIndex} name="courses" id="courses" onChange={e => changeEv(e)}>
                        {requirements.map((courseData, idx) => <option key={idx} value={idx}>{courseData.title}</option>)}
                    </select>
                </div>
                
                
                <h1>Total MCs: {props.userPlanner.reduce((prev, curr) => prev + (curr.modules.reduce((acc, currValue) => acc + currValue.moduleCredit, 0)), 0)}</h1>
                <h1>Eligible for Graduation: {canGraduate ? "Yes" : "No"}</h1>
            </div>
            
                
                {
                props.userPlanner.length > 0
                ? <div className='PlannerBody' ref={exportRef}>
                        {props.userPlanner.map((semester, idx) => <SemesterTile darkMode={props.darkMode} semesterId={idx} key={semester.title} title={semester.title} modules={semester.modules} />)}
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
                <h3>
                    <a href='default.com' onClick={onCapture}>  
                        Download
                    </a>
                </h3>
            </div>
        </div>
    
    
  );
}

export default PlannerApp;