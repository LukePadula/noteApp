import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentRecord } from "../../app/Slices/AppSlice";
import { NOTE } from "../../app/PredefinedValues";
import TextEditor from "../TextEditor/TextEditor";
import RecordDetails from "../RecordDetails/RecordDetails";
import NoteSummary from "../NoteSummary/NoteSummary";
import NavBar from "../NavBar/NavBar";
import "./Note.css";
import { useEffect } from "react";
import { getRecords } from "../../app/Utils/Callouts";

const Note = () => {
  const { id } = useParams();
  let recordData = useSelector(selectCurrentRecord);

  useEffect(() => {
    const getData = async () => {
      getRecords(NOTE, id);
    };

    getData();
  }, []);

  if (!recordData) {
    return <h1 className="error">Something went wrong</h1>;
  }

  return (
    <>
      <NavBar />
      <div className="page-content">
        <RecordDetails record={recordData} object={NOTE} />
        <TextEditor
          record={recordData}
          recordId={id}
          object={NOTE}
          content={recordData.content}
        />
        <NoteSummary
          summary={recordData.summary}
          recordId={id}
          summaryLastRefreshed={recordData.summaryLastRefreshed}
        />
      </div>
    </>
  );
};

export default Note;
