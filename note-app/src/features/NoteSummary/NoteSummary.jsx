import "./NoteSummary.css";
import { useDispatch } from "react-redux";
import { onSummaryRefresh } from "../../app/Slices/AppSlice";
import { generateObjectTitle } from "../../app/Utils/Utils";
import { refreshSummary } from "../../app/Utils/Callouts";

const NoteSummary = (props) => {
  const dispatch = useDispatch();
  const { recordId, summary, summaryLastRefreshed } = props;
  console.log(recordId, "RECORD ID");
  const summaryItems = [];

  for (const key in summary) {
    summary[key].forEach((element) => {
      summaryItems.push(
        <>
          <small className="summary-topic">{generateObjectTitle(key)}</small>
          <small className="summary-text">{element}</small>
        </>
      );
    });
  }

  let summaryContent;
  if (summaryItems.length) {
    summaryContent = <div className="summary-list">{summaryItems}</div>;
  } else {
    summaryContent = (
      <div className="no-results">
        <p> Click refresh to generate a summary</p>
      </div>
    );
  }

  let listActionButtons = (
    <button
      onClick={() => refreshSummary(recordId)}
      className="button-orange-square refresh"
    >
      <span className="material-symbols-outlined">refresh</span>
    </button>
  );

  return (
    <div className="list-container">
      <div className="list-title summary-list">
        <h1>Summary</h1>
        {summaryLastRefreshed && (
          <small className="refresh-date">
            Last refreshed:{" "}
            {summaryLastRefreshed.toLocaleDateString("en-GB", {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            })}
          </small>
        )}

        <div className="list-actions">{listActionButtons}</div>
      </div>
      {summaryContent}
    </div>
  );
};

export default NoteSummary;
