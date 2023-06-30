import { useSelector, useDispatch } from "react-redux";
import { selectRecordData } from "../../app/Slices/AppSlice";
import { useParams } from "react-router-dom";
import TextEditor from "../TextEditor/TextEditor";
import RecordDetails from "../RecordDetails/RecordDetails";
import { TEMPLATE } from "../../app/PredefinedValues";
import NavBar from "../NavBar/NavBar";

const Template = (props) => {
  const { id } = useParams();

  console.log(id);
  let recordData = useSelector((state) =>
    selectRecordData(state, { object: TEMPLATE, id })
  );

  console.log(recordData);
  return (
    <>
      <NavBar />
      <RecordDetails record={recordData} object={TEMPLATE} />
      <div>
        <TextEditor title={`Template: ${recordData.title}`} />
      </div>
    </>
  );
};

export default Template;
