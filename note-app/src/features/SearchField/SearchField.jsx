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
} from "../../app/Slices/AppSlice";
import { NAVIGATE, SELECT } from "../../app/PredefinedValues";
import "./SearchField.css";

const SearchField = (props) => {
  const { searchAction, searchObjects, value } = props;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  let searchResults = useSelector(selectSearchResults);
  let searchItems = [];
  let searchInput = useSelector(selectSearchInput);
  console.log(value, "VALUE");

  if (searchResults) {
    searchResults.forEach((element) => {
      console.log(element);
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
          X
        </div>
        <div className="search-results-cont">{searchItems}</div>
      </div>
    </>
  );
};

export default SearchField;
