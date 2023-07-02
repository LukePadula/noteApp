import React, { useEffect } from "react";
import "./RecordDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { selectRecordDetailsDropdownActive } from "../../app/Slices/AppSlice";
import { onDropDownOpenClose, onRecordEdit } from "../../app/Slices/AppSlice";
import { TEMPLATE, NOTE } from "../../app/PredefinedValues";

const RecordDetails = (props) => {
  const { record, object } = props;

  console.log(record);

  let dropDownActive = useSelector(selectRecordDetailsDropdownActive);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      if (dropDownActive) {
        dispatch(onDropDownOpenClose());
      }
    };
  }, []);

  let detailData;

  const recordActions = (
    <div className="record-details-actions">
      <button
        onClick={() => {
          dispatch();
        }}
        className="button-green"
      >
        Edit
      </button>
      <button className="button-orange">Delete</button>
    </div>
  );
  console.log(record);

  switch (object) {
    case NOTE:
      const { title, template, event, description, created, modified } = record;
      detailData = (
        <form
          action=""
          onSubmit={() =>
            dispatch(onRecordEdit({ recordId: record.id, object }))
          }
        >
          <div className="edit-field">
            <label htmlFor="title">
              Title
              <input id="title" value={title} type="text" />
            </label>
          </div>
          <div className="edit-field">
            <label htmlFor="template">
              Template
              <input
                id="template"
                disabled="true"
                value={template}
                type="text"
              />
            </label>
          </div>
          <div className="edit-field">
            <label htmlFor="event">
              Event
              <input id="event" disabled="true" value={event} type="text" />
            </label>
          </div>
          <div className="edit-field">
            <label htmlFor="description">
              Description
              <textarea id="description" value={description} type="text" />
            </label>
          </div>
          <div className="read-only-fields">
            <small>
              Last modified:{" "}
              {modified.toLocaleDateString("en-GB", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}{" "}
            </small>
            <small>
              Created:{" "}
              {created.toLocaleDateString("en-GB", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}
            </small>
          </div>
          {recordActions}
        </form>
      );
      break;

    case TEMPLATE:
      detailData = (
        <>
          <div className="edit-field">
            <label htmlFor="title">
              Title
              <input id="title" type="text" />
            </label>
          </div>
          <div className="edit-field">
            <label htmlFor="description">
              Description
              <textarea id="description" cols="30" rows="4"></textarea>
            </label>
          </div>
          <div className="read-only-fields">
            <small>Last modified: </small>
            <small>Created: </small>
          </div>
          {recordActions}
        </>
      );
      break;
    default:
      break;
  }

  return (
    <div className="record-details-cont">
      <div className="details-header">
        <h1>{record.title}</h1>
        <button
          onClick={() => dispatch(onDropDownOpenClose())}
          className="button-green-square"
        >
          <span class="material-symbols-outlined">expand_more</span>
        </button>
      </div>
      {dropDownActive && <div className="record-details">{detailData}</div>}
    </div>
  );
};

export default RecordDetails;
