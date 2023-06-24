import { useSelector, useDispatch } from "react-redux";
import { selectRecordData } from "../../app/Slices/AppSlice";
import { useParams } from "react-router-dom";
import TextEditor from "../TextEditor/TextEditor";

const Template = (props) => {
  const { id } = useParams();

  console.log(id);
  let recordData = useSelector((state) =>
    selectRecordData(state, { object: "TEMPLATE", id })
  );

  console.log(recordData);
  return (
    <>
      <div>
        <TextEditor title={`Template: ${recordData.title}`} />
      </div>
      <div>{/* <ObjectList object={SUMMARY} /> */}</div>
    </>
  );
};

export default Template;
