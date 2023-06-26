import { useSelector, useDispatch } from "react-redux";
import { NOTE, TEMPLATE, EVENT, SUMMARY } from "../../app/PredefinedValues";
import "./ObjectContainer.css";
import {
  onActionMenuClick,
  onRecordDelete,
  onRecordView,
} from "../../app/Slices/AppSlice";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

const ObjectContainer = (props) => {
  const { object, record } = props;
  let recordContent;
  let recordButtonActionsContainer;
  let recordButtonActions;
  const dispatch = useDispatch();

  switch (object) {
    case NOTE:
      recordContent = (
        <>
          <div className="record-data record-link">
            <Link to={`/note/${record.id}`}>{record.title}</Link>
          </div>
          <div className="record-data">
            <small>{record.eventName}</small>
          </div>
          <div className="record-data">
            <small>{record.created}</small>
          </div>
          <div className="record-data">
            <small>{record.modified}</small>
          </div>
        </>
      );

      recordButtonActions = (
        <>
          <div className="record-actions">
            <div>
              <Link to={`/note/${record.id}`}>View</Link>
            </div>
            <div
              onClick={() =>
                dispatch(onRecordDelete({ id: record.id, object: object }))
              }
            >
              Delete
            </div>
          </div>
        </>
      );

      recordButtonActionsContainer = (
        <div
          className="actions-cont"
          onClick={() =>
            dispatch(onActionMenuClick({ id: record.id, object: object }))
          }
        >
          {record.showActions && [recordButtonActions]}
        </div>
      );

      break;

    case TEMPLATE:
      recordContent = (
        <>
          <div className="record-data">
            <Link to={`/template/${record.id}`}>{record.title}</Link>
          </div>
          <div className="record-data">
            <small>{record.created}</small>
          </div>
          <div className="record-data">
            <small>{record.modified}</small>
          </div>
        </>
      );

      recordButtonActions = (
        <>
          <div className="record-actions">
            <div
              onClick={() =>
                dispatch(onRecordView({ id: record.id, object: object }))
              }
            >
              View
            </div>
            <div
              onClick={() =>
                dispatch(onRecordDelete({ id: record.id, object: object }))
              }
            >
              Delete
            </div>
          </div>
        </>
      );

      recordButtonActionsContainer = (
        <div
          className="actions-cont"
          onClick={() =>
            dispatch(onActionMenuClick({ id: record.id, object: object }))
          }
        >
          {record.showActions && [recordButtonActions]}
        </div>
      );
      break;

    case EVENT:
      recordContent = (
        <>
          <div className="record-data">
            <small>{record.title}</small>
          </div>
          <div className="record-data">
            <small>{record.status}</small>
          </div>
          <div className="record-data">
            <small>{record.startDateTime}</small>
          </div>
        </>
      );

      recordButtonActions = (
        <>
          <div className="record-actions">
            <div
              onClick={() =>
                dispatch(onRecordView({ id: record.id, object: object }))
              }
            >
              View
            </div>
          </div>
        </>
      );

      recordButtonActionsContainer = (
        <div
          className="actions-cont"
          onClick={() =>
            dispatch(onActionMenuClick({ id: record.id, object: object }))
          }
        >
          {record.showActions && [recordButtonActions]}
        </div>
      );
      break;

    case SUMMARY:
      recordContent = (
        <>
          <div className="record-data">
            <small>{record.category}</small>
          </div>
          <div className="record-data">
            <small>{record.description}</small>
          </div>
        </>
      );

    default:
      break;
  }

  return (
    <>
      {recordContent}
      {recordButtonActionsContainer}
    </>
  );
};

export default ObjectContainer;
