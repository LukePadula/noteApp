import { useSelector, useDispatch } from "react-redux";
import { NOTE, TEMPLATE, EVENT } from "../../app/PredefinedValues";
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
  let recordButtonActions;
  let showActionMenu = false;
  const dispatch = useDispatch();

  switch (object) {
    case NOTE:
      recordContent = (
        <>
          <Link to={`note/${record.id}`}>{record.title}</Link>
          <small>{record.eventName}</small>
          <small>{record.created}</small>
          <small>{record.modified}</small>
        </>
      );

      if (record.showActions) {
        recordButtonActions = (
          <>
            <div className="record-actions">
              <div>
                <Link to={`note/${record.id}`}>View</Link>
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
      }

      break;

    case TEMPLATE:
      recordContent = (
        <>
          <small>{record.title}</small>
          <small>{record.created}</small>
          <small>{record.modified}</small>
        </>
      );

      if (record.showActions) {
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
      }
      break;

    case EVENT:
      recordContent = (
        <>
          <small>{record.title}</small>
          <small>{record.status}</small>
          <small>{record.startDateTime}</small>
        </>
      );

      if (record.showActions) {
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
      }
      break;

    default:
      break;
  }

  return (
    <>
      <div className="record">
        {recordContent}
        <div
          className="actions-cont"
          onClick={() =>
            dispatch(onActionMenuClick({ id: record.id, object: object }))
          }
        >
          {recordButtonActions}
        </div>
      </div>
    </>
  );
};

export default ObjectContainer;
