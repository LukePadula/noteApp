import "./NoteSummary.css";
import { useDispatch } from "react-redux";
import { onSummaryRefresh } from "../../app/Slices/AppSlice";

const NoteSummary = (props) => {
  const dispatch = useDispatch();
  const { recordId, summary } = props;
  const summaryItems = [];

  for (const key in summary) {
    summary[key].forEach((element) => {
      summaryItems.push(
        <>
          <small className="summary-topic">{key}</small>
          <small>{element}</small>
        </>
      );
    });
  }

  let summaryContent;
  if (summaryItems.length) {
    summaryContent = (
      <div style={{ gridTemplateColumns: `30% 70%` }} className="summary-list">
        {summaryItems}
      </div>
    );
  } else {
    summaryContent = (
      <div className="no-results">
        <p> Click refresh to generate a summary</p>
      </div>
    );
  }

  let listActionButtons = (
    <button
      onClick={() => dispatch(onSummaryRefresh({ recordId }))}
      className="button-orange-square"
    >
      <span className="material-symbols-outlined">refresh</span>
    </button>
  );

  return (
    <div className="list-container">
      <div className="list-title">
        <h1>Summary</h1>
        <div className="list-actions">{listActionButtons}</div>
      </div>
      {summaryContent}
    </div>
  );
};

export default NoteSummary;
