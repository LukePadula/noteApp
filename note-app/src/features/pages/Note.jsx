import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectRecordData } from "../../app/Slices/AppSlice";
import { NOTE } from "../../app/PredefinedValues";
import ObjectList from "../ObjectList/ObjectList";
import TextEditor from "../TextEditor/TextEditor";
import RecordDetails from "../RecordDetails/RecordDetails";
import NoteSummary from "../NoteSummary/NoteSummary";
import NavBar from "../NavBar/NavBar";
import "./Note.css";

const Note = () => {
  const { id } = useParams();
  let recordData = useSelector((state) =>
    selectRecordData(state, { object: "NOTE", id })
  );

  return (
    <>
      <NavBar />
      <div className="page-content">
        <RecordDetails record={recordData} object={NOTE} />
        <TextEditor recordId={id} object={NOTE} content={recordData.content} />
        <NoteSummary summary={recordData.summary} recordId={id} />
      </div>
    </>
  );
};

export default Note;
