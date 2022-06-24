import '../../assets/PlannerApp.css';
import PlannerApp from './PlannerApp';
import RequirementsApp from './RequirementsApp';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getModules, getReq, reset} from "../../features/modules/moduleSlice"
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';


function PlannerPage() {
    const dispatch = useDispatch();

    const {requirements, isError, message } = useSelector(state => state.modules)
      
      useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        dispatch(reset())
    }, [isError, message, dispatch])


    const [requirementsActive, setRequirementsActive] = useState(false);
    const [selected, setSelected] = useState(-1);

    const topLevelAction = () => dispatch => {
      return Promise.all([dispatch(getReq()), dispatch(getModules())])
    }
    
    useEffect(() => {
        dispatch(topLevelAction()).then(() => dispatch(reset()))
      }, [dispatch])

    return (
    <div className="PlannerPage">
        {requirementsActive 
        ? <RequirementsApp selected={selected} setSelected={setSelected} courseData={requirements} 
        requirementsActive={requirementsActive} setRequirementsActive={setRequirementsActive} /> 
        : <PlannerApp selected={selected} setSelected={setSelected} courseData={requirements} 
        requirementsActive={requirementsActive} setRequirementsActive={setRequirementsActive}
         />}
    </div>
  );
}

export default PlannerPage;