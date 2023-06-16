import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectRecordData } from "../../app/Slices/AppSlice";

const Note = () => {
  const { id } = useParams();
  let recordData = useSelector((state) =>
    selectRecordData(state, { object: "NOTE", id })
  );

  return (
    <>
      <h1>Note</h1>
      <p>{recordData.title}</p>
      <p>{recordData.eventName}</p>
    </>
  );
};

export default Note;
