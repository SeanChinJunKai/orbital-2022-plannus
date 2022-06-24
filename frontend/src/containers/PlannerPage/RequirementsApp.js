import '../../assets/PlannerApp.css';
import { useSelector} from 'react-redux';

function RequirementsApp(props) {

    const { semesters } = useSelector(state => state.modules)
    // test requirement, purely for development
    // test modules taken, purely for development
    let modulesTaken = []
    semesters.forEach(semester => {
        modulesTaken = modulesTaken.concat(semester.modules)
    })

    const changeEv = (e) => {
        props.setSelected(e.currentTarget.value)
    }

  return (
    <div className='RequirementsApp'>
        <div className='PlannerHeader RequirementsHeader'>
            <div className='selected-course-container'>
                <select defaultValue={props.selected} name="courses" id="courses" onChange={e => changeEv(e)}>
                    <option value={-1} disabled className='placeholder-option'>Select A Course...</option>
                    {props.courseData.map((courseData, idx) => 
                        <option key={idx} value={idx}>{courseData.title}</option>)}
                </select>
            </div>
            
        </div>
        <div className='RequirementsBody'>
            {props.selected !== -1 ?props.courseData[props.selected].requirements.map((requirement, idx) =>
            <div key={idx} className='requirement-container'>
                <h1>{requirement.heading}</h1>
                {requirement.subHeadings ? requirement.subHeadings.map((subheading, idx) => 
                <div key={idx} className='subrequirement-container'>
                    <h3 className='subrequirement-heading'>{subheading.subHeadingTitle}</h3>
                    <div className='subrequirement-modules-container'>
                        {subheading.subHeadingCriteria.map((criteria, idx) =>
                        <div key={idx}>
                            {criteria.criteriaTitle ? <h2 className='criteria-header'>{criteria.criteriaTitle}</h2> : <></>}
                            <ul className='criteria-modules'>
                                {criteria.modules.map((criteriaModule, idx) => 
                                <li style={modulesTaken.filter(module => module.moduleCode === criteriaModule.moduleCode).length > 0
                                ? {color : 'green'} : {color : 'intial'}} key={idx}>{criteriaModule.moduleCode} {criteriaModule.name} {criteriaModule.moduleCredit} MC</li>)}
                            </ul>
                            
                        </div>
                            
                        )}
                    </div>
                </div>
                ) : <></>}
            </div>) : <></>}
            
        </div>
        <div className='RequirementsFooter'>
            <h3><a href='default.com' onClick={(e) => {
                e.preventDefault();
                props.setRequirementsActive(!props.requirementsActive)
            }}>Back to Planner</a></h3>
        </div>
    </div>
    
  );
}

export default RequirementsApp;