import '../../assets/PlannerApp.css';
import PlannerApp from './PlannerApp';
import RequirementsApp from './RequirementsApp';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { checkGraduation, getModules, getReq, reset } from "../../features/modules/moduleSlice"
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';


function PlannerPage() {
    const dispatch = useDispatch();

    const { isWarning, isError, message } = useSelector(state => state.modules)
      
      useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (isWarning) {
          toast.warning(message)
        }
        dispatch(reset())
    }, [isError, isWarning, message, dispatch])

    


    const [requirementsActive, setRequirementsActive] = useState(false);

    const topLevelAction = () => dispatch => {
      return Promise.all([dispatch(getReq()), dispatch(getModules())]).then(() => dispatch(checkGraduation()))
    }
    
    useEffect(() => {
        dispatch(topLevelAction()).then(() => dispatch(reset()))
      }, [dispatch])

    return (
    <div className="PlannerPage">
        {requirementsActive 
        ? <RequirementsApp 
            requirementsActive={requirementsActive} setRequirementsActive={setRequirementsActive} /> 
        : <PlannerApp  
              requirementsActive={requirementsActive} setRequirementsActive={setRequirementsActive}
         />}
    </div>
  );
}

export default PlannerPage;