import { generateObjectTitle } from "../../app/Utils/Utils";
import { useSelector } from "react-redux";
import ListHeaders from "../ListHeaders/ListHeaders";
import {
  selectNoteData,
  selectTemplateData,
  selectEventData,
  selectSummaryData,
} from "../../app/Slices/AppSlice";
import { NOTE, TEMPLATE, EVENT, SUMMARY } from "../../app/PredefinedValues";
import ObjectContainer from "../ObjectContainer/ObjectContainer";
import ListActions from "../ListActions/ListActions";
import CalendarAction from "../CalendarAction/CalendarAction";
import "./ObjectList.css";

const ObjectList = (props) => {
  const { object, recordId } = props;

  // Empty string is for record actions column
  const headers = {
    [NOTE]: ["Title", "Event", "Created", "Modified", ""],
    [TEMPLATE]: ["Title", "Created", "Modified", ""],
    [EVENT]: ["Title", "Status", "Start", ""],
    [SUMMARY]: ["Category", "Description"],
  };

  //Create object to easily get correct selector function.
  const selectorMap = {
    [NOTE]: selectNoteData,
    [TEMPLATE]: selectTemplateData,
    [EVENT]: selectEventData,
    [SUMMARY]: selectSummaryData,
  };

  let objectRecords = useSelector(selectorMap[object]);
  let listTitle = generateObjectTitle(object) + "s";
  let listActionButtons = <ListActions object={object} />;

  // If no results found.
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
      <CalendarAction
        label={objectRecords ? "Open calendar" : "Sync calendar"}
      />
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
