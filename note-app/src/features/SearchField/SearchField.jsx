import { useSelector, useDispatch } from "react-redux";
import {
  onModalOpenClose,
  onSearch,
  onRecordLookupSelect,
  onSearchClear,
} from "../../app/Slices/AppSlice";
import { useNavigate } from "react-router-dom";
import {
  selectSearchResults,
  selectSearchInput,
  selectEventSearchInput,
  selectTemplateSearchInput,
  selectTemplateSearchResults,
  selectEventSearchResults,
} from "../../app/Slices/AppSlice";
import { NAVIGATE, SELECT } from "../../app/PredefinedValues";
import { TEMPLATE, EVENT } from "../../app/PredefinedValues";
import "./SearchField.css";
import { generateObjectTitle } from "../../app/Utils/Utils";

const SearchField = (props) => {
  const { searchAction, searchObjects, value, disabled } = props;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  let searchItems = [];

  const getSearchSelectors = () => {
    if (Array.isArray(searchObjects)) {
      return { input: selectSearchInput, results: selectSearchResults };
    } else if (searchObjects === TEMPLATE) {
      return {
        input: selectTemplateSearchInput,
        results: selectTemplateSearchResults,
      };
    } else if (searchObjects === EVENT) {
      return {
        input: selectEventSearchInput,
        results: selectEventSearchResults,
      };
    }
  };

  const relevantSearchSelectors = getSearchSelectors();
  let searchInput = useSelector(relevantSearchSelectors.input);
  let searchResults = useSelector(relevantSearchSelectors.results);

  if (searchResults) {
    searchResults.forEach((element) => {
      searchItems.push(
        <button
          className="search-item"
          onClick={() => {
            if (searchAction == NAVIGATE) {
              navigate(`/${element.object}/${element.id}`);
              dispatch(onModalOpenClose());
            } else if (searchAction == SELECT) {
              dispatch(
                onRecordLookupSelect({ recordId: element.id, searchObjects })
              );
            }
          }}
        >
          <small>{element.title}</small>
          <small>{generateObjectTitle(element.object)}</small>
        </button>
      );
    });
  }

  return (
    <>
      <div className="search-bar-cont">
        <input
          className="search-bar"
          type="text"
          value={value ? value : searchInput}
          disabled={value ? true : false || disabled}
          onChange={(e) => {
            dispatch(onSearch({ value: e.target.value, searchObjects }));
          }}
        />
        <div
          className="search-clear"
          onClick={() => {
            dispatch(onSearchClear({ searchObjects }));
          }}
        >
          <span className="material-symbols-outlined">close</span>
        </div>
        <div className="search-results-cont">{searchItems}</div>
      </div>
    </>
  );
};

export default SearchField;
