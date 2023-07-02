import { useSelector, useDispatch } from "react-redux";
import { NOTE, TEMPLATE, EVENT, SUMMARY } from "../../app/PredefinedValues";
import "./ObjectContainer.css";
import {
  onActionMenuClick,
  onRecordDelete,
  onRecordView,
  onModalOpenClose,
} from "../../app/Slices/AppSlice";
import { Link } from "react-router-dom";

const ObjectContainer = (props) => {
  const { object, record } = props;
  let recordContent;
  let recordButtonActionsContainer;
  let recordButtonActions;
  const dispatch = useDispatch();

  // console.log(record.created);
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
            <small>
              {record.created.toLocaleDateString("en-GB", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}
            </small>
          </div>
          <div className="record-data">
            <small>
              {record.modified.toLocaleDateString("en-GB", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}
            </small>
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
        <button className="actions-cont">
          <span class="material-symbols-outlined">expand_more</span>
          {recordButtonActions}
        </button>
      );

      break;

    case TEMPLATE:
      recordContent = (
        <>
          <div className="record-data record-link">
            <Link to={`/template/${record.id}`}>{record.title}</Link>
          </div>
          <div className="record-data">
            <small>
              {record.created.toLocaleDateString("en-GB", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}
            </small>
          </div>
          <div className="record-data">
            <small>
              {record.modified.toLocaleDateString("en-GB", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}
            </small>
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
        <button className="actions-cont">
          <span class="material-symbols-outlined">expand_more</span>
          {recordButtonActions}
        </button>
      );
      break;

    case EVENT:
      recordContent = (
        <>
          <div className="record-data record-link">
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

      recordButtonActionsContainer = (
        <button
          onClick={() => {
            dispatch(onModalOpenClose({ type: "createRecord", object: NOTE }));
          }}
          className="actions-cont event-action"
        >
          <span class="material-symbols-outlined">add</span>
        </button>
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
