import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../assets/PlannerApp.css';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { useSelector } from 'react-redux';
import { addModule, reset } from '../../features/modules/moduleSlice';
import { useDispatch } from 'react-redux';


function SearchOverlay(props) {
     
      // Random color function, purely for development

      function hashCode(str) { // java String#hashCode
        var hash = 0;
        for (var i = 0; i < str.length; i++) {
           hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        return hash;
      } 

      const dispatch = useDispatch()
    
    function intToRGB(i){
        var c = (i & 0x00FFFFFF)
            .toString(16)
            .toUpperCase();
    
        return "00000".substring(0, 6 - c.length) + c;
    }

    const getColourFromModuleCode = (moduleCode) => "#" + intToRGB(hashCode(moduleCode))

      const { modules } = useSelector(state => state.modules)
      

      const handleOnSearch = (string, results) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
      }
    
      const handleOnHover = (result) => {
        // the item hovered
      }
    
      const handleOnSelect = (module) => {
        const moduleWithColor = {
          ...module,
          color: getColourFromModuleCode(module.moduleCode)
        }

        const addModuleData = {
          module: moduleWithColor,
          semesterId: props.semesterId
        }
        dispatch(addModule(addModuleData))
        // the item selected
        props.setSearching(!props.searching);
        return (() => dispatch(reset()))
      }
    
      const handleOnFocus = () => {
      }
    
      const formatResult = (item) => {
        return (
          <>
            <span style={{ display: 'block', textAlign: 'left' }}>Module Code: {item.moduleCode}</span>
            <span style={{ display: 'block', textAlign: 'left' }}>Module Credits: {item.moduleCredit}</span>
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
            resultStringKeyName="code"
            formatResult={formatResult}
            placeholder={"Add a module to " + props.semesterTitle}
          />
        </div>
    </div>
  );
}

export default SearchOverlay;