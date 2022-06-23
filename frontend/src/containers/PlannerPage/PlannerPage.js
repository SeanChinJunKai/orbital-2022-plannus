import '../../assets/PlannerApp.css';
import { useState, useEffect} from "react";
import PlannerApp from './PlannerApp';
import RequirementsApp from './RequirementsApp';
import {useDispatch} from 'react-redux';
import {getModules, reset} from '../../features/modules/moduleSlice';


function PlannerPage() {

    const dispatch = useDispatch()
    const [requirementsActive, setRequirementsActive] = useState(false);
    const [selected, setSelected] = useState(-1);

    useEffect(() => {
        dispatch(getModules()).then(() => dispatch(reset()))
      }, [])

    // test course data, purely for development
    const courseData = [
        {id: 0, courseName: "Bachelor of Computing in Information Systems"},
        {id: 1, courseName: "Bachelor of Computing in Computer Science"},
        {id: 2, courseName: "Bachelor of Engineering in Computer Engineering"},
        {id: 3, courseName: "Bachelor of Science in Business Analytics"},
        {id: 4, courseName: "Bachelor of Computing in Information Security"}
    ]
    return (
    <div className="PlannerPage">
        {requirementsActive 
        ? <RequirementsApp selected={selected} setSelected={setSelected} courseData={courseData} requirementsActive={requirementsActive} setRequirementsActive={setRequirementsActive} /> 
        : <PlannerApp selected={selected} setSelected={setSelected} courseData={courseData} requirementsActive={requirementsActive} setRequirementsActive={setRequirementsActive} />}
    </div>
  );
}

export default PlannerPage;