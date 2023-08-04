import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectRecordData,
  selectCurrentRecord,
} from "../../app/Slices/AppSlice";
import { onCurrentRecordLoad } from "../../app/Slices/AppSlice";
import { NOTE } from "../../app/PredefinedValues";
import TextEditor from "../TextEditor/TextEditor";
import RecordDetails from "../RecordDetails/RecordDetails";
import NoteSummary from "../NoteSummary/NoteSummary";
import NavBar from "../NavBar/NavBar";
import "./Note.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

const Note = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  let recordData = useSelector(selectCurrentRecord);

  useEffect(() => {
    const getData = async () => {
      let record = await axios.get(
        `http://localhost:6002/records/notes/?id=1234`
      );
      dispatch(onCurrentRecordLoad(record.data));
    };

    getData();
  }, []);

  // let recordData = useSelector((state) =>
  //   selectRecordData(state, { object: NOTE, id })
  // );

  if (!recordData) {
    return <h1 className="error">Something went wrong</h1>;
  }

  return (
    <>
      <NavBar />
      <div className="page-content">
        <RecordDetails record={recordData[0]} object={NOTE} />
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
