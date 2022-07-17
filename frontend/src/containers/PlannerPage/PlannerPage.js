import '../../assets/PlannerApp.css';
import PlannerApp from './PlannerApp';
import RequirementsApp from './RequirementsApp';
import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { reset } from "../../features/modules/moduleSlice"
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';


function PlannerPage(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isWarning, isError, message } = useSelector(state => state.modules)
    const { user } = useSelector(state => state.auth)  

      useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (isWarning) {
          toast.warning(message)
        }

        if(!user) {
          navigate('/login')
        } else {
          if (!user.verified) {
            navigate('/blocked')
          }
        }
        dispatch(reset())
    }, [isError, isWarning, message, dispatch, user, navigate])

    

    const [requirementsActive, setRequirementsActive] = useState(false);

    return (
    <div className="PlannerPage">
        {requirementsActive 
        ? <RequirementsApp 
            requirementsActive={requirementsActive} setRequirementsActive={setRequirementsActive} /> 
        : <PlannerApp  
              darkMode={props.darkMode} requirementsActive={requirementsActive} setRequirementsActive={setRequirementsActive} userPlanner={user ? user.planner : []} 
         />}
    </div>
  );
}

export default PlannerPage;