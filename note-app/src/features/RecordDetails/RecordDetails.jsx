import "./RecordDetails.css";
import { useDispatch } from "react-redux";
import { onModalOpenClose } from "../../app/Slices/AppSlice";
import { TEMPLATE, NOTE } from "../../app/PredefinedValues";

const RecordDetails = (props) => {
  const { record, object } = props;
  const dispatch = useDispatch();
  let detailData;

  const readOnlyFields = (
    <div className="read-only-fields">
      <small className="read-only-value">
        Last modified:{" "}
        {record.modified.toLocaleDateString("en-GB", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        })}{" "}
      </small>
      <small className="read-only-value">
        Created:{" "}
        {record.created.toLocaleDateString("en-GB", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        })}
      </small>
    </div>
  );

  const modifyRecordActions = (
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
      detailData = (
        <form>
          <div className="edit-field">
            <label htmlFor="title">
              Title
              <input
                id="title"
                disabled={true}
                value={record.title}
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
                value={record.event.title}
                type="text"
              />
            </label>
          </div>
          <div className="edit-field">
            <label htmlFor="template">
              Template
              <input
                id="template"
                disabled={true}
                value={record.template.title}
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
                value={record.description}
                type="text"
              />
            </label>
          </div>
          {readOnlyFields}
          {modifyRecordActions}
        </form>
      );
      break;
    case TEMPLATE:
      detailData = (
        <>
          <form>
            <div className="edit-field">
              <label htmlFor="title">
                Title
                <input
                  id="title"
                  value={record.title}
                  disabled={true}
                  type="text"
                />
              </label>
            </div>
            <div className="edit-field">
              <label htmlFor="description">
                Description
                <textarea
                  id="description"
                  value={record.description}
                  disabled={true}
                  cols="30"
                  rows="4"
                ></textarea>
              </label>
            </div>
            {readOnlyFields}
            {modifyRecordActions}
          </form>
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
