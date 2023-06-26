import { useSelector, useDispatch } from "react-redux";
import "../SignOutModal/SignOutModal.css";
import { useEffect } from "react";
import { onModalOpenClose, onSearch } from "../../../../app/Slices/AppSlice";
import { useNavigate } from "react-router-dom";
import "../SearchModal/SearchModal.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import {
  selectNoteData,
  selectTemplateData,
  selectSearchInput,
  selectSearchResults,
} from "../../..//../app/Slices/AppSlice";

const SearchModal = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let searchResults = useSelector(selectSearchResults);
  let searchItems = [];

  if (searchResults) {
    searchResults.forEach((element) => {
      console.log(element.title);
      searchItems.push(
        <div
          className="search-item"
          onClick={() => {
            navigate(`/${element.object}/${element.id}`);
            dispatch(onModalOpenClose());
          }}
        >
          <Link to={`/${element.object}/${element.id}`}>{element.title}</Link>
          <small>{element.object}</small>
        </div>
      );
    });
  }

  return (
    <>
      <div className="modal-content">
        <h1 className="modal-header">Search</h1>
        <input
          className="search-bar"
          type="text"
          onChange={(e) => dispatch(onSearch(e.target.value))}
        />
        <div className="search-results-cont">{searchItems}</div>
      </div>
    </>
  );
};

export default SearchModal;
