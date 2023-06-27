import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectRecordData } from "../../app/Slices/AppSlice";
import { SUMMARY, NOTE } from "../../app/PredefinedValues";
import ObjectList from "../ObjectList/ObjectList";
import TextEditor from "../TextEditor/TextEditor";
import RecordDetails from "../RecordDetails/RecordDetails";

const Note = () => {
  const { id } = useParams();
  let recordData = useSelector((state) =>
    selectRecordData(state, { object: "NOTE", id })
  );

  return (
    <>
      <RecordDetails recordData={recordData} />
      <div>
        <TextEditor recordId={id} object={NOTE} content={recordData.content} />
      </div>
      <div>
        <ObjectList object={SUMMARY} />
      </div>
    </>
  );
};

export default Note;
