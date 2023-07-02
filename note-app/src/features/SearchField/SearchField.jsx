import { useSelector, useDispatch } from "react-redux";
import {
  onModalOpenClose,
  onSearch,
  onRecordLookupSelect,
  onSearchClear,
} from "../../app/Slices/AppSlice";
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import {
  selectSearchResults,
  selectSearchInput,
  selectEventSearchInput,
  selectTemplateSearchInput,
} from "../../app/Slices/AppSlice";
import { NAVIGATE, SELECT } from "../../app/PredefinedValues";
import { TEMPLATE, EVENT } from "../../app/PredefinedValues";
import "./SearchField.css";

const SearchField = (props) => {
  const { searchAction, searchObjects, value } = props;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  let searchResults = useSelector(selectSearchResults);
  let searchItems = [];
  let objectToSearch;

  const objectSearchInputSelector = {
    [TEMPLATE]: selectTemplateSearchInput,
    [EVENT]: selectEventSearchInput,
    templateAndEvents: selectSearchInput,
  };

  console.log(Array.isArray(searchObjects));

  if (Array.isArray(searchObjects)) {
    objectToSearch = objectSearchInputSelector.templateAndEvents;
  } else {
    objectToSearch = objectSearchInputSelector[searchObjects];
  }
  console.log(objectToSearch, "Object to search");
  let searchInput = useSelector(objectToSearch);

  if (searchResults) {
    searchResults.forEach((element) => {
      searchItems.push(
        <div
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
          <small>{element.object}</small>
        </div>
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
          disabled={value ? true : false}
          onChange={(e) => {
            dispatch(onSearch({ value: e.target.value, searchObjects }));
          }}
        />
        <div
          className="search-clear"
          onClick={() => {
            dispatch(onSearchClear());
          }}
        >
          <span class="material-symbols-outlined">close</span>
        </div>
        <div className="search-results-cont">{searchItems}</div>
      </div>
    </>
  );
};

export default SearchField;
