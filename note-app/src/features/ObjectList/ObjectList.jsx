import ObjectContainer from "../ObjectContainer/ObjectContainer";
import { useSelector } from "react-redux";
import "../../features/General.css";
import ListHeaders from "../ListHeaders/ListHeaders";
import {
  selectNoteData,
  selectTemplateData,
  selectEventData,
  selectSummaryData,
} from "../../app/Slices/AppSlice";
import { NOTE, TEMPLATE, EVENT, SUMMARY } from "../../app/PredefinedValues";
import "./ObjectList.css";
import "../../features/General.css";
import ListActions from "../ListActions/ListActions";

const ObjectList = (props) => {
  const { object, recordId } = props;

  // Empty string is for record actions column
  const headers = {
    [NOTE]: ["Title", "Event", "Created", "Modified", ""],
    [TEMPLATE]: ["Title", "Created", "Modified", ""],
    [EVENT]: ["Title", "Status", "Time", ""],
    [SUMMARY]: ["Category", "Description"],
  };

  //Create map to easily get correct selector function.
  const selectorMap = {
    [NOTE]: selectNoteData,
    [TEMPLATE]: selectTemplateData,
    [EVENT]: selectEventData,
    [SUMMARY]: selectSummaryData,
  };

  // Retrieve correct selector using object key and get predefined data.
  let objectRecords = useSelector(selectorMap[object]);

  //Format list title.
  let listTitle = object.toLowerCase() + "s";
  listTitle = listTitle[0].toUpperCase() + listTitle.substring(1);
  let listActionButtons;
  listActionButtons = <ListActions object={object} />;

  //If no results found.
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

  //If event add calendar button.
  let calendarAction;
  if (object === EVENT) {
    calendarAction = (
      <div className="calendar-action-cont">
        <button className="calendar-action button-orange">
          {objectRecords ? "Open calendar" : "Sync calendar"}
        </button>
      </div>
    );
  }

  return (
    <div id={object} className="list-container">
      <div className="main-content">
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
      </div>
      {calendarAction}
    </div>
  );
};

export default ObjectList;
