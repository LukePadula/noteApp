import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectRecordData } from "../../app/Slices/AppSlice";
import { SUMMARY, NOTE } from "../../app/PredefinedValues";
import ObjectList from "../ObjectList/ObjectList";
import TextEditor from "../TextEditor/TextEditor";
const Note = () => {
  const { id } = useParams();
  console.log(id);
  let recordData = useSelector((state) =>
    selectRecordData(state, { object: "NOTE", id })
  );

  return (
    <>
      <h1>Note</h1>
      <div></div>
      <div>{/* <ObjectList object={SUMMARY} /> */}</div>
      <div>
        <TextEditor />
      </div>
      <p>{recordData.title}</p>
      <p>{recordData.eventName}</p>
    </>
  );
};

export default Note;
