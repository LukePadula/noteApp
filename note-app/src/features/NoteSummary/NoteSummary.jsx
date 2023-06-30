import "./NoteSummary.css";
import { useDispatch } from "react-redux";
import { onSummaryRefresh } from "../../app/Slices/AppSlice";

const NoteSummary = (props) => {
  const dispatch = useDispatch();
  const { recordId, summary } = props;
  const summaryItems = [];

  for (const key in summary) {
    summary[key].forEach((element) => {
      console.log(element);
      summaryItems.push(
        <>
          <small className="summary-topic">{key}</small>
          <small className="summary-content">{element}</small>
        </>
      );
    });
  }

  let listActionButtons = (
    <button
      onClick={() => dispatch(onSummaryRefresh({ recordId }))}
      className="button-orange-square"
    >
      R
    </button>
  );

  return (
    <div className="list-container">
      <div className="list-title">
        <h1>Summary</h1>
        <div className="list-actions">{listActionButtons}</div>
      </div>
      <div style={{ gridTemplateColumns: `30% 70%` }} className="summary-list">
        {summaryItems}
      </div>
    </div>
  );
};

export default NoteSummary;
