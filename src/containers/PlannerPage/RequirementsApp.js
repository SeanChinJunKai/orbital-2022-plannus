import '../../assets/PlannerApp.css';

function RequirementsApp(props) {
    const requirements = [{
        heading: 'Common Curriculum Requirements',
        totalCredits: 40,
        subHeadings: [{
            subHeadingTitle: 'University Level Requirements',
            subHeadingTotalCredits: 24,
            modules: [{
                name: 'Programming Methodology (Digital Literacy)',
                code: 'CS1101S',
                credits: 4,
                color: 'darkblue',
            }, {
                name: 'Cultures and Connections',
                code: 'GEC%',
                credits: 4,
                color: 'darkblue',
            }, {
                name: 'Data Literacy',
                code: 'Either GEA1000, BT1101, ST1131 or DSE1101',
                credits: 4,
                color: 'darkblue',
            }, {
                name: 'Singapore Studies',
                code: 'GES%',
                credits: 4,
                color: 'darkblue',
            }, {
                name: 'Communicating in the Information Age',
                code: 'ES2660',
                credits: 4,
                color: 'darkblue',
            }, {
                name: 'Communities and Engagement (Critique and Expression)',
                code: 'GEN%',
                credits: 4,
                color: 'darkblue',
            }]
        }, {
            subHeadingTitle: 'Computing Ethics',
            subHeadingTotalCredits: 4,
            modules: [{
                name: 'Digital Ethics and Data Privacy',
                code: 'IS1108',
                credits: 4,
                color: 'darkblue',
            }]
        }, {
            subHeadingTitle: 'Interdisciplinary & Cross-Disciplinary Education',
            subHeadingTotalCredits: 12,
            modules: [{
                name: 'Digital Ethics and Data Privacy',
                code: 'IS1108',
                credits: 4,
                color: 'darkblue',
            }, {
                name: 'Digital Ethics and Data Privacy',
                code: 'IS1108',
                credits: 4,
                color: 'darkblue',
            }, {
                name: 'Digital Ethics and Data Privacy',
                code: 'IS1108',
                credits: 4,
                color: 'darkblue',
            }]
        }]
    }, {
        heading: 'Programme Requirements',
        totalCredits: 80,
        subHeadings: [{
            subHeadingTitle: 'Computer Science Foundation',
            subHeadingTotalCredits: 36,
            modules: []
        }, {
            subHeadingTitle: 'Computer Science Breadth and Depth',
            subHeadingTotalCredits: 32,
            modules: []
        }, {
            subHeadingTitle: 'Mathematics and Sciences',
            subHeadingTotalCredits: 12,
            modules: []
        }]
    }, {
        heading: 'Unrestricted Electives',
        totalCredits: 40,
        subHeadings: [{
            subHeadingTitle: 'Unrestricted Electives',
            subHeadingTotalCredits: 40,
            modules: []
        }]
    }]
    
  return (
    <div className='RequirementsApp'>
        <div className='PlannerHeader RequirementsHeader'>
            <h1>Course: CS</h1>
            <h1>Total MC Count: 160</h1>
            <h1>Eligible for Graduation: Yes</h1>
        </div>
        <div className='RequirementsBody'>
            {requirements.map(requirement => 
            <div className='requirement-container'>
                <h1>{requirement.heading}</h1>
                {requirement.subHeadings.map(subheading => <h3>{subheading.subHeadingTitle}</h3>)}
            </div>)}
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