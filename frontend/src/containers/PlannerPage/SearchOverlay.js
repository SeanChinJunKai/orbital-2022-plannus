import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../assets/PlannerApp.css';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { useSelector} from 'react-redux';
function SearchOverlay(props) {
      function hashCode(str) { // java String#hashCode
        var hash = 0;
        for (var i = 0; i < str.length; i++) {
          hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        return hash;
      } 

      function intToRGB(i){
        var c = (i & 0x00FFFFFF)
            .toString(16)
            .toUpperCase();

        return "00000".substring(0, 6 - c.length) + c;
      }
      const {modules} = useSelector((state) => state.modules)
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
        props.setTotalCredits(props.totalCredits + module.moduleCredit);
        props.setSearching(!props.searching);
        module.color = '#' + intToRGB(hashCode(module.moduleCode))
      }
    
      const handleOnFocus = () => {
        console.log('Focused')
      }
    
      const formatResult = (item) => {
        return (
          <>
            <span style={{ display: 'block', textAlign: 'left' }}>Module Code: {item.moduleCode}</span>
            <span style={{ display: 'block', textAlign: 'left' }}>Modular Credits: {item.moduleCredit}</span>
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
            fuseOptions={{ keys: ["moduleCode"] }}
            resultStringKeyName="moduleCode"
            formatResult={formatResult}
            placeholder={"Add a module to " + props.semesterTitle + " by module code"}
          />
        </div>
    </div>
  );
}

export default SearchOverlay;