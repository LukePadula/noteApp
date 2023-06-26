import React, { useEffect } from "react";
import "./RecordDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { selectRecordDetailsDropdownActive } from "../../app/Slices/AppSlice";
import { onDropDownOpenClose } from "../../app/Slices/AppSlice";

const RecordDetails = () => {
  //   let dropDownActive = false;
  let dropDownActive = useSelector(selectRecordDetailsDropdownActive);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      if (dropDownActive) {
        dispatch(onDropDownOpenClose());
      }
    };
  }, []);

  return (
    <div className="record-details-cont">
      <div className="details-header">
        <h1>Meeting Name</h1>
        <button
          onClick={() => dispatch(onDropDownOpenClose())}
          className="button-green-square"
        >
          T
        </button>
      </div>
      {dropDownActive && (
        <div className="record-details">
          <p>Template</p>
          <p>Event</p>
          <p>Last modified</p>
          <p>Created</p>
          <p>Description</p>
          <div className="record-details-actions">
            <button className="button-green">Edit</button>
            <button className="button-orange">Delete</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecordDetails;
