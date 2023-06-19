import ObjectContainer from "../ObjectContainer/ObjectContainer";
import { LIST_HEADERS } from "../../app/PredefinedValues";
import { useSelector, useDispatch } from "react-redux";
import "../../features/General.css";
import ListHeaders from "../ListHeaders/ListHeaders";

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

  // Empty string is for record actions column
  const headers = {
    [NOTE]: ["Title", "Event", "Created", "Modified", ""],
    [TEMPLATE]: ["Title", "Created", "Modified", ""],
    [EVENT]: ["Title", "Status", "Time", ""],
  };

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

  console.log(object);

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

  // Get headers.
  let headerList = headers[object].map((title) => (
    <ListHeaders key={title} header={title}></ListHeaders>
  ));
  // Get record details
  let recordList = objectRecords.map((record, index) => (
    <ObjectContainer key={index} object={object} record={record} />
  ));
  // Add headers to first row of grid.
  recordList.unshift(headerList);

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
      <div
        style={{ gridTemplateColumns: `repeat(${headerList.length} ,1fr)` }}
        className="record-list"
      >
        {recordList}
      </div>
      {calendarAction}
    </div>
  );
};

export default ObjectList;
