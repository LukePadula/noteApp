import ObjectContainer from "../ObjectContainer/ObjectContainer";
import { LIST_HEADERS, TEST_DATA } from "../../app/PredefinedValues";
import "./ObjectList.css";

const ObjectList = (props) => {
  const { object } = props;
  console.log(object);
  //Get data using props object.
  let objectRecords = TEST_DATA[object];

  let headers = LIST_HEADERS[object].map((header, index) => (
    <h2 key={index}>{header}</h2>
  ));

  // Get record details
  let recordList = objectRecords.map((record, index) => (
    <ObjectContainer key={index} object={object} record={record} />
  ));

  return (
    <div className="record-list">
      <div className="list-headings">{headers}</div>
      {recordList}
    </div>
  );
};

export default ObjectList;
