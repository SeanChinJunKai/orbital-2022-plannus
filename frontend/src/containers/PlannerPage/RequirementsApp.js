import '../../assets/PlannerApp.css';
import { useSelector} from 'react-redux';
import { useDispatch } from 'react-redux';
import { checkGraduation, setSelectedIndex, reset } from '../../features/modules/moduleSlice';




function RequirementsApp(props) {

    const {selectedRequirementIndex, requirements } = useSelector(state => state.modules)
    const {planner} = useSelector(state => state.auth.user)
    const dispatch = useDispatch();
    let modulesTaken = []
    planner.forEach(semester => {
        modulesTaken = modulesTaken.concat(semester.modules)
    })

    const changeEv = (e) => {
        dispatch(setSelectedIndex(e.currentTarget.value)).then(() => dispatch(checkGraduation())).then(()=> dispatch(reset()))
    }

    const moduleFulfilled = (modulesTaken, criteriaModule) => {
        function satisfies(moduleString, module) {
            return moduleString.includes("%") ? module.includes(moduleString.replace(/%/g, '')) : module === moduleString;
          }
        return modulesTaken.filter(module => satisfies(criteriaModule.moduleCode, module.moduleCode)).length > 0
    }

  return (
    <div className='RequirementsApp'>
        <div className='PlannerHeader RequirementsHeader'>
            <div className='selected-course-container'>
                <select defaultValue={selectedRequirementIndex} name="courses" id="courses" onChange={e => changeEv(e)}>
                    {requirements.map((courseData, idx) => 
                        <option key={idx} value={idx}>{courseData.title}</option>)}
                </select>
            </div>
            
        </div>
        <div className='RequirementsBody'>
            {
                requirements 
                ? requirements[selectedRequirementIndex].requirements.map((requirement) =>
                    <div key={requirement} className='requirement-container'>
                        <h1>{requirement.heading} - {requirement.totalCredits} MCs</h1>
                        {
                            requirement.subHeadings 
                            ? requirement.subHeadings.map((subheading) => 
                                <div key={subheading} className='subrequirement-container'>
                                    <h3 className='subrequirement-heading'>{subheading.subHeadingTitle} - {subheading.subHeadingTotalCredits} MCs</h3>
                                    <div className='subrequirement-modules-container'>
                                        {subheading.subHeadingCriteria.map((criteria) =>
                                            <div key={criteria}>
                                                {criteria.criteriaTitle ? <h2 className='criteria-header'>{criteria.criteriaTitle} - {criteria.criteriaCredits} MCs</h2> : <></>}
                                                <ul className='criteria-modules'>
                                                    {criteria.modules.map((criteriaModule) =>
                                                        moduleFulfilled(modulesTaken, criteriaModule) 
                                                        ? <li key={criteriaModule} style={{color : 'green'}}>
                                                            {criteriaModule.moduleCode} {criteriaModule.name} {criteriaModule.moduleCredit} MC
                                                          </li>
                                                        : <li key={criteriaModule} style={{color : 'initial'}}>
                                                            {criteriaModule.moduleCode} {criteriaModule.name} {criteriaModule.moduleCredit} MC
                                                          </li>
                                                        )
                                                    }
                                                </ul>
                                                
                                            </div>
                                        )}
                                    </div>
                                </div>)
                            : <></>
                        }
                    </div>)
                : <></>
            }
            
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