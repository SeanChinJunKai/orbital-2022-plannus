import '../../assets/PlannerApp.css';
import { useState } from "react";
import PlannerApp from './PlannerApp';
import RequirementsApp from './RequirementsApp';

function PlannerPage() {
    const [requirementsActive, setRequirementsActive] = useState(false);
    return (
    <div className="PlannerPage">
        {requirementsActive 
        ? <RequirementsApp requirementsActive={requirementsActive} setRequirementsActive={setRequirementsActive} /> 
        : <PlannerApp requirementsActive={requirementsActive} setRequirementsActive={setRequirementsActive} />}
    </div>
  );
}

export default PlannerPage;