import { useSelector, useDispatch } from "react-redux";
import { NOTE, TEMPLATE, EVENT } from "../../app/PredefinedValues";
import "./ObjectContainer.css";

const ObjectContainer = (props) => {
  const { object, record } = props;
  let recordContent;

  switch (object) {
    case NOTE:
      recordContent = (
        <>
          <small>{record.title}</small>
          <small>{record.eventName}</small>
          <small>{record.created}</small>
          <small>{record.modified}</small>
        </>
      );
      break;

    case TEMPLATE:
      recordContent = (
        <>
          <small>{record.title}</small>
          <small>{record.created}</small>
          <small>{record.modified}</small>
        </>
      );
      break;

    case EVENT:
      recordContent = (
        <>
          <small>{record.title}</small>
          <small>{record.status}</small>
          <small>{record.startDateTime}</small>
        </>
      );
      break;

    default:
      break;
  }

  return <div className="record">{recordContent}</div>;
};

export default ObjectContainer;
