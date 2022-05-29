import '../../assets/PlannerApp.css';
import SemesterTile from './SemesterTile';
import { useState } from "react";
//import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns'

function PlannerApp(props) {

    // Test semesters, purely for development
    const [semesters, setSemesters] = useState([{
        title: "Year 1 Semester 1"
    }, {
        title: "Year 1 Semester 2"
    }, {
        title: "Year 2 Semester 1"
    }, {
        title: "Year 2 Semester 2"
    }, {
        title: "Year 3 Semester 1"
    }])
    
  return (
    <div className='PlannerContainer'>
        <div className='PlannerHeader'>
        
            <div className='planner-dropdown-container'>
                <select defaultValue={props.selected} name="courses" id="courses" onChange={e => props.setSelected(e.currentTarget.value)}>
                    <option value={-1} disabled className='placeholder-option'>Select A Course...</option>
                    {props.courseData.map((courseData, idx) => <option key={idx} selected={courseData.id === props.selected ? true : false} value={courseData.id}>{courseData.courseName}</option>)}
                </select>
            </div>
            
            
            <h1>Total MCs: 160</h1>
            <h1>Eligible for Graduation: Yes</h1>
        </div>
        <div className='PlannerBody'>
            {semesters.map((semester, idx) => <SemesterTile idx={idx} key={idx} title={semester.title} semesters={semesters} setSemesters={setSemesters} />)}
        </div>
        <div className='PlannerFooter'>
            <h3><a href='default.com' onClick={(e) => {
                e.preventDefault();
                props.setRequirementsActive(!props.requirementsActive);
            }}>View Course Requirements</a></h3>
            <h3><a href='default.com' onClick={(e) => {
                e.preventDefault();
                setSemesters([...semesters, {title : 'Year ' + 
                ((semesters.length + 1) % 2 === 0 ? Math.floor((semesters.length + 1) / 2) : Math.floor((semesters.length + 1) / 2) + 1)
                + ' Semester ' + (semesters.length % 2 + 1)}]);
            }}>Add New Semester</a></h3>
        </div>
    </div>
    
  );
}

export default PlannerApp;