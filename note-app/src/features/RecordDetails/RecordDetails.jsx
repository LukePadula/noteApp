import "./RecordDetails.css";
import { useDispatch } from "react-redux";
import { onRecordEdit, onModalOpenClose } from "../../app/Slices/AppSlice";
import { TEMPLATE, NOTE } from "../../app/PredefinedValues";

const RecordDetails = (props) => {
  const { record, object } = props;
  const dispatch = useDispatch();
  let detailData;

  const recordActions = (
    <div className="record-details-actions">
      <button
        onClick={(e) => {
          e.preventDefault();
          dispatch(onModalOpenClose({ type: "edit", id: record.id, object }));
        }}
        className="button-green"
      >
        Edit
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          dispatch(
            onModalOpenClose({
              type: "delete",
              recordDelete: { object, recordId: record.id },
            })
          );
        }}
        className="button-orange"
      >
        Delete
      </button>
    </div>
  );

  switch (object) {
    case NOTE:
      const { title, template, event, description, created, modified } = record;

      detailData = (
        <form>
          <div className="edit-field">
            <label htmlFor="title">
              Title
              <input id="title" disabled={true} value={title} type="text" />
            </label>
          </div>
          <div className="edit-field">
            <label htmlFor="template">
              Template
              <input
                id="template"
                disabled={true}
                value={template.title}
                type="text"
              />
            </label>
          </div>
          <div className="edit-field">
            <label htmlFor="event">
              Event
              <input
                id="event"
                disabled={true}
                value={event.title}
                type="text"
              />
            </label>
          </div>
          <div className="edit-field">
            <label htmlFor="description">
              Description
              <textarea
                id="description"
                disabled={true}
                value={description}
                type="text"
              />
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
              <input id="title" disabled={true} type="text" />
            </label>
          </div>
          <div className="edit-field">
            <label htmlFor="description">
              Description
              <textarea
                id="description"
                disabled={true}
                cols="30"
                rows="4"
              ></textarea>
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
        <h1 id="details-title">{record.title}</h1>

        <label
          className="button-green-square"
          id="detail-drop-down"
          htmlFor="toggle"
        >
          <span className="material-symbols-outlined">expand_more</span>
        </label>
        <input type="checkbox" id="toggle" className="visually-hidden" />
        <div className="detail">{detailData}</div>
      </div>
    </div>
  );
};

export default RecordDetails;
