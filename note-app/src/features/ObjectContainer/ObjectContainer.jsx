import { NOTE, TEMPLATE, EVENT, SUMMARY } from "../../app/PredefinedValues";
import "./ObjectContainer.css";
import { Link } from "react-router-dom";
import RecordActions from "../RecordActions/RecordActions";

const ObjectContainer = (props) => {
  const { object, record } = props;
  let recordContent;

  switch (object) {
    case NOTE:
      recordContent = (
        <>
          <div className="record-data record-link">
            <Link to={`/${object.toLowerCase()}/${record.id}`}>
              {record.title}
            </Link>
          </div>
          <div className="record-data">
            <small>{record.eventName}</small>
          </div>
          <div className="record-data">
            <small>{record.created_date}</small>
          </div>
          <div className="record-data">
            <small>{record.last_modified_date}</small>
          </div>
        </>
      );

      break;

    case TEMPLATE:
      recordContent = (
        <>
          <div className="record-data record-link">
            <Link to={`/${object.toLowerCase()}/${record.id}`}>
              {record.title}
            </Link>
          </div>
          <div className="record-data">
            <small>{record.createdDate}</small>
          </div>
          <div className="record-data">
            <small>{record.modifiedDate}</small>
          </div>
        </>
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
            <small>
              {/* {record.startDateTime.toLocaleDateString("en-GB", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              })} */}
            </small>
          </div>
        </>
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
      <RecordActions object={object} id={record.id} title={record.title} />
    </>
  );
};

export default ObjectContainer;
