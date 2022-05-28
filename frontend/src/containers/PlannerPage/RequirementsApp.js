import '../../assets/PlannerApp.css';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns'

function RequirementsApp(props) {
    const requirements = [{
        heading: 'Common Curriculum Requirements',
        totalCredits: 40,
        subHeadings: [{
            subHeadingTitle: 'University Level Requirements',
            subHeadingTotalCredits: 24,
            subHeadingCriteria: [{
                criteriaTitle: 'Digital Literacy',
                modules: [
                    {
                        name: 'Programming Methodology',
                        code: 'CS1101S',
                        credits: 4,
                        color: 'darkblue',
                    }
                ]
                }, {
                    criteriaTitle: 'Critique and Expression',
                    modules: [
                        {
                            name: 'Communicating in the Information Age',
                            code: 'ES2660',
                            credits: 4,
                            color: 'darkblue',
                        }
                    ]
                }, {
                    criteriaTitle: 'Cultures and Connections',
                    modules: [
                        {
                            name: 'Film Art and Human Concerns',
                            code: 'GEC1017',
                            credits: 4,
                            color: 'darkblue',
                        }
                    ]
                }, {
                    criteriaTitle: 'Data Literacy',
                    modules: [
                        {
                            name: 'Quantitative Reasoning with Data',
                            code: 'GEA1000',
                            credits: 4,
                            color: 'darkblue',
                        }
                    ]
                }, {
                    criteriaTitle: 'Singapore Studies',
                    modules: [
                        {
                            name: 'Public Health in Singapore: Challenges and Changes',
                            code: 'GES1042',
                            credits: 4,
                            color: 'darkblue',
                        }
                    ]
                }, {
                    criteriaTitle: 'Communities and Engagement',
                    modules: [
                        {
                            name: 'Communities and Engagement',
                            code: 'GEN1512',
                            credits: 4,
                            color: 'darkblue',
                        }
                    ]
                }
            ]
        }, {
            subHeadingTitle: 'Computing Ethics',
            subHeadingTotalCredits: 4,
            subHeadingCriteria: [{
                criteriaTitle: '',
                modules: [
                    {
                        name: 'Digital Ethics and Data Privacy',
                        code: 'IS1108',
                        credits: 4,
                        color: 'darkblue',
                    }]
                }
            ]
        }, {
            subHeadingTitle: 'Interdisciplinary & Cross-Disciplinary Education',
            subHeadingTotalCredits: 12,
            subHeadingCriteria: [{
                criteriaTitle: '',
                modules: [{
                    name: 'IT, Management and Organisation',
                    code: 'IS1128',
                    credits: 4,
                    color: 'darkblue',
                }, {
                    name: 'Asian Interconnections',
                    code: 'HSA1000',
                    credits: 4,
                    color: 'darkblue',
                }, {
                    name: 'From DNA to Gene Therapy',
                    code: 'HSI2003',
                    credits: 4,
                    color: 'darkblue',
                }]
            }]
        }]
    }, {
        heading: 'Programme Requirements',
        totalCredits: 80,
        subHeadings: [{
            subHeadingTitle: 'Computer Science Foundation',
            subHeadingTotalCredits: 36,
            subHeadingCriteria: [{
                criteriaTitle: '',
                modules: [{
                    name: 'Discrete Structures',
                    code: 'CS1231S',
                    credits: 4,
                    color: 'darkblue',
                }, {
                    name: 'Programming Methodology II',
                    code: 'CS2030S',
                    credits: 4,
                    color: 'darkblue',
                }, {
                    name: 'Data Structures and Algorithms',
                    code: 'CS2040S',
                    credits: 4,
                    color: 'darkblue',
                }, {
                    name: 'Computer Organisation',
                    code: 'CS2100',
                    credits: 4,
                    color: 'darkblue',
                }, {
                    name: 'Effective Communication for Computing Professionals',
                    code: 'CS2101',
                    credits: 4,
                    color: 'darkblue',
                }, {
                    name: 'Software Engineering',
                    code: 'CS2103T',
                    credits: 4,
                    color: 'darkblue',
                }, {
                    name: 'Introduction to Operating Systems',
                    code: 'CS2106',
                    credits: 4,
                    color: 'darkblue',
                }, {
                    name: 'Introduction to AI and Machine Learning',
                    code: 'CS2109S',
                    credits: 4,
                    color: 'darkblue',
                }, {
                    name: 'Design and Analysis of Algorithms',
                    code: 'CS3230',
                    credits: 4,
                    color: 'darkblue',
                }]
            }]
        }, {
            subHeadingTitle: 'Computer Science Breadth and Depth',
            subHeadingTotalCredits: 32,
            subHeadingCriteria: [{
                criteriaTitle: '',
                modules: [{
                    name: 'Internship',
                    code: 'CP3200',
                    credits: 4,
                    color: 'darkblue',
                }, {
                    name: 'Internship II',
                    code: 'CP3202',
                    credits: 4,
                    color: 'darkblue',
                }, {
                    name: 'Foundations of Software Engineering',
                    code: 'CS3213',
                    credits: 4,
                    color: 'darkblue',
                }, {
                    name: 'Software Engineering Principles and Patterns',
                    code: 'CS3219',
                    credits: 4,
                    color: 'darkblue',
                }, {
                    name: 'Formal Methods for Software Engineering',
                    code: 'CS4211',
                    credits: 4,
                    color: 'darkblue',
                }, {
                    name: 'B.Comp. Dissertation',
                    code: 'CP4101',
                    credits: 12,
                    color: 'darkblue',
                }]
            }]
        }, {
            subHeadingTitle: 'Mathematics and Sciences',
            subHeadingTotalCredits: 12,
            subHeadingCriteria: [{
                criteriaTitle: '',
                modules: [{
                    name: 'Calculus for Computing',
                    code: 'MA1521',
                    credits: 4,
                    color: 'darkblue',
                }, {
                    name: 'Linear Algebra I',
                    code: 'MA2001',
                    credits: 4,
                    color: 'darkblue',
                }, {
                    name: 'Probability and Statistics',
                    code: 'ST2334',
                    credits: 4,
                    color: 'darkblue',
                }]
            }]
        }]
    }, {
        heading: 'Unrestricted Electives',
        totalCredits: 40,
        subHeadings: [{
            subHeadingTitle: 'Unrestricted Electives',
            subHeadingTotalCredits: 40,
            subHeadingCriteria: [{
                criteriaTitle: '',
                modules: [{
                    name: 'Fundamental Biochemistry',
                    code: 'LSM2106',
                    credits: 4,
                    color: 'darkblue',
                }, {
                    name: 'Human Anatomy',
                    code: 'LSM2212',
                    credits: 4,
                    color: 'darkblue',
                }, {
                    name: 'Cell Biology',
                    code: 'LSM2233',
                    credits: 4,
                    color: 'darkblue',
                }, {
                    name: 'Introductory Bioinformatics',
                    code: 'LSM2241',
                    credits: 4,
                    color: 'darkblue',
                }, {
                    name: 'Ecology and Environment',
                    code: 'LSM2251',
                    credits: 4,
                    color: 'darkblue',
                }, {
                    name: 'Biodiversity',
                    code: 'LSM2252',
                    credits: 4,
                    color: 'darkblue',
                }, {
                    name: 'Project Finance',
                    code: 'PF2205',
                    credits: 4,
                    color: 'darkblue',
                }, {
                    name: 'Event Management',
                    code: 'PF2305',
                    credits: 4,
                    color: 'darkblue',
                }, {
                    name: 'Principles and Approaches to Design',
                    code: 'ID1223',
                    credits: 4,
                    color: 'darkblue',
                }, {
                    name: 'The Art of Imaginative Sketching',
                    code: 'ID2117',
                    credits: 4,
                    color: 'darkblue',
                }]
            }]
            
        }]
    }]
    
    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    const modules = [{
        code : "CS2030S",
        credits : 4,
        color: getRandomColor()
      }, {
        code : "CS2040S",
        credits : 4,
        color: getRandomColor()
      }, {
        code: "GEA1000",
        credits: 4,
        color: getRandomColor()
      }, {
        code: "CS2100",
        credits: 4,
        color: getRandomColor()
      }, {
        code: "ES2660",
        credits: 4,
        color: getRandomColor()
    }];

  return (
    <div className='RequirementsApp'>
        <div className='PlannerHeader RequirementsHeader'>
            <div className='selected-course-container'>
                <DropDownListComponent select={(e) => props.setSelected(e.itemData.id)} index={props.selected} placeholder='Select A Course...' dataSource={props.courseData} fields={{value:"id", text:"courseName"}}>
                </DropDownListComponent>
            </div>
            
        </div>
        <div className='RequirementsBody'>
            {requirements.map((requirement, idx) =>
            <div key={idx} className='requirement-container'>
                <h1>{requirement.heading}</h1>
                {requirement.subHeadings.map((subheading, idx) => 
                <div key={idx} className='subrequirement-container'>
                    <h3 className='subrequirement-heading'>{subheading.subHeadingTitle}</h3>
                    <div className='subrequirement-modules-container'>
                        {subheading.subHeadingCriteria.map((criteria, idx) =>
                        <div key={idx}>
                            {criteria.criteriaTitle ? <h2 className='criteria-header'>{criteria.criteriaTitle}</h2> : <></>}
                            {criteria.modules.map((criteriaModule, idx) => 
                            <h3 style={modules.filter(module => module.code === criteriaModule.code).length > 0
                             ? {color : 'green'} : {color : 'initial'}} key={idx}>{criteriaModule.code} {criteriaModule.name} {criteriaModule.credits} MC</h3>)}
                        </div>
                            
                        )}
                    </div>
                </div>
                )}
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