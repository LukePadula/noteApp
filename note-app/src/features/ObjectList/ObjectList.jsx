import ObjectContainer from "../ObjectContainer/ObjectContainer";
import { LIST_HEADERS } from "../../app/PredefinedValues";
import { useSelector, useDispatch } from "react-redux";
import "../../features/General.css";

import {
  selectNoteData,
  selectTemplateData,
  selectEventData,
} from "../../app/Slices/AppSlice";
import { NOTE, TEMPLATE, EVENT } from "../../app/PredefinedValues";

import "./ObjectList.css";
import "../../features/General.css";

const ObjectList = (props) => {
  const { object } = props;

  console.log(props);
  //Create map to easily get correct selector function.
  const selectorMap = {
    [NOTE]: selectNoteData,
    [TEMPLATE]: selectTemplateData,
    [EVENT]: selectEventData,
  };

  // Retrieve correct selector using object key and get predefined data.
  const selectData = selectorMap[object];
  let objectRecords = useSelector(selectData);

  //Format list title.
  let listTitle = object.toLowerCase() + "s";
  listTitle = listTitle[0].toUpperCase() + listTitle.substring(1);
  let listActionButtons;

  //Create predefined list headers.
  let headers = LIST_HEADERS[object].map((header, index) => (
    <h2 key={index}>{header}</h2>
  ));

  if (!objectRecords || objectRecords.length === 0) {
    return (
      <>
        <div className="list-container">
          <div className="list-title">
            <h1>{listTitle}</h1>
            <div className="list-actions">{listActionButtons}</div>
          </div>
          <small className="no-results">{`No ${object.toLowerCase()}s here yet..`}</small>
        </div>
      </>
    );
  }
  // Get record details
  let recordList = objectRecords.map((record, index) => (
    <ObjectContainer key={index} object={object} record={record} />
  ));

  let calendarAction;

  switch (object) {
    case NOTE:
      listActionButtons = <button className="button-orange-square">+</button>;
      break;

    case TEMPLATE:
      listActionButtons = <button className="button-orange-square">+</button>;

      break;
    case EVENT:
      if (objectRecords) {
        calendarAction = (
          <div className="calendar-action-cont">
            <button className="calendar-action button-orange">
              Open calendar
            </button>
          </div>
        );
      } else {
        calendarAction = (
          <div className="calendar-action-cont">
            <button className="open-calendar button-orange">
              Sync calendar
            </button>
          </div>
        );
      }

    default:
      break;
  }

  return (
    <div className="list-container">
      <div className="list-title">
        <h1>{listTitle}</h1>
        <div className="list-actions">{listActionButtons}</div>
      </div>
      <div className="record-list">
        <div className="list-headings">{headers}</div>
        {recordList}
        {calendarAction}
      </div>
    </div>
  );
};

export default ObjectList;
