import '../../assets/PlannerApp.css';
import SemesterTile from './SemesterTile';
import { useSelector, useDispatch } from 'react-redux';
import { addSemester, clearSemesters } from "../../features/modules/moduleSlice"


function PlannerApp(props) {
    const {semesters } = useSelector(state => state.modules)
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

    function satisfies(moduleString, module) {
        return moduleString.includes("%") ? module.includes(moduleString.replace(/%/g, '')) : module === moduleString;
    }

    const satisfyRequirement = (requirements, inputModule) => {
        let moduleInProgramme = false;
        for (let requirement of requirements) {
            if ((requirement.heading === "Unrestricted Electives")) {
                if (!moduleInProgramme) {
                    requirement.totalCredits -= inputModule.moduleCredit;
                } else {
                    break;
                }
            } else {
                for (let subrequirement of requirement.subHeadings) {
                    const initialSubheadingCredits = subrequirement.subHeadingTotalCredits;
                    for (let criteria of subrequirement.subHeadingCriteria) {
                        const initialCriteriaCredits = criteria.criteriaCredits;
                        for (let module of criteria.modules) {
                            if (satisfies(module.moduleCode, inputModule.moduleCode)) {
                                criteria.criteriaCredits -= module.moduleCredit;
                                
                                moduleInProgramme = true;
                            }
                        }
                        if (criteria.criteriaCredits <= 0) {
                            subrequirement.subHeadingTotalCredits -= initialCriteriaCredits;
                        }
                    }
                    if (subrequirement.subHeadingTotalCredits <= 0) {
                        requirement.totalCredits -= initialSubheadingCredits;
                    }
                }
            }
            
        }
        return requirements;
    }
    
    const satisfiesProgramme = (requirements, modulesTakenArray) => {
        let result = requirements;
        for (let module of modulesTakenArray) {
            result = satisfyRequirement(result, module);
        }
        return result;
    }
    
    const eligibleForGraduation = (requirements) => {
        return requirements.reduce((prev, requirement) => prev + requirement.totalCredits, 0) <= 0;
    }

    let modulesTaken = []
    semesters.forEach(semester => {
        modulesTaken = modulesTaken.concat(semester.modules)
    })
    console.log(props.courseData)
    
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
            <h1>{eligibleForGraduation(satisfiesProgramme(props.courseData[0].requirements, modulesTaken)) ? <h1>Yes</h1>: <h1>No</h1>}</h1>
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
            <h3><a href='default.com' onClick={clearSemestersOnClick}>Clear All Semester Data</a></h3>
            <h3><a href='default.com' onClick={addSemestersOnClick}>Add New Semester</a></h3>
        </div>
    </div>
    
  );
}

export default PlannerApp;