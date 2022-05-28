import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../assets/PlannerApp.css';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

function SearchOverlay(props) {
     
      // Random color function, purely for development

      function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }

      // Test modules, purely for development
      
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

      const handleOnSearch = (string, results) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
        console.log(string, results)
      }
    
      const handleOnHover = (result) => {
        // the item hovered
        console.log(result)
      }
    
      const handleOnSelect = (module) => {
        props.setModules([...props.activeModules, module]);
        // the item selected
        props.setTotalCredits(props.totalCredits + module.credits);
        props.setSearching(!props.searching);
      }
    
      const handleOnFocus = () => {
        console.log('Focused')
      }
    
      const formatResult = (item) => {
        return (
          <>
            <span style={{ display: 'block', textAlign: 'left' }}>Module Code: {item.code}</span>
            <span style={{ display: 'block', textAlign: 'left' }}>Modular Credits: {item.credits}</span>
          </>
        )
      }
  return (
    <div className="SearchOverlay">
        <div className='close-container'>
            <FontAwesomeIcon icon={faXmark} className="close-button" onClick={() => props.setSearching(!props.searching)}/>
        </div>
        
        <div className='search-container'>
          <ReactSearchAutocomplete
            items={modules}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            autoFocus
            fuseOptions={{ keys: ["code"] }}
            resultStringKeyName="code"
            formatResult={formatResult}
            placeholder={"Add a module to " + props.semesterTitle}
          />
        </div>
    </div>
  );
}

export default SearchOverlay;