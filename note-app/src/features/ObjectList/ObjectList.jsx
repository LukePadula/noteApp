import ObjectContainer from "../ObjectContainer/ObjectContainer";
import { LIST_HEADERS } from "../../app/PredefinedValues";
import { useSelector, useDispatch } from "react-redux";
import { selectTestData } from "../../app/Slices/AppSlice";
import "./ObjectList.css";
import "../../features/General.css";

const ObjectList = (props) => {
  const testData = useSelector(selectTestData);
  const { object } = props;
  //Get data using props object.
  let objectRecords = testData[object];
  let listTitle = object.toLowerCase();
  listTitle = listTitle[0].toUpperCase() + listTitle.substring(1);

  let headers = LIST_HEADERS[object].map((header, index) => (
    <h2 key={index}>{header}</h2>
  ));

  // Get record details
  let recordList = objectRecords.map((record, index) => (
    <ObjectContainer key={index} object={object} record={record} />
  ));

  let listButtons;

  return (
    <div className="list-container">
      <div className="list-title">
        <h1>{listTitle}</h1>
        <div className="list-actions">
          <button className="button-orange-square">+</button>
          {/* <button className="button-orange">Delete</button> */}
        </div>
      </div>
      <div className="record-list">
        <div className="list-headings">{headers}</div>
        {recordList}
      </div>
    </div>
  );
};

export default ObjectList;
