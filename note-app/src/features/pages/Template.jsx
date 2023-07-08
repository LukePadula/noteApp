import { useSelector } from "react-redux";
import { selectRecordData } from "../../app/Slices/AppSlice";
import { useParams } from "react-router-dom";
import TextEditor from "../TextEditor/TextEditor";
import RecordDetails from "../RecordDetails/RecordDetails";
import { TEMPLATE } from "../../app/PredefinedValues";
import NavBar from "../NavBar/NavBar";

const Template = () => {
  const { id } = useParams();

  let recordData = useSelector((state) =>
    selectRecordData(state, { object: TEMPLATE, id })
  );

  console.log(recordData, "RECORD DATA");

  if (!recordData) {
    return <h1 className="error">Something went wrong</h1>;
  }

  return (
    <>
      <NavBar />
      <div className="page-content">
        <RecordDetails record={recordData} object={TEMPLATE} />
        <div>
          <TextEditor
            record={recordData}
            title={`Template: ${recordData.title}`}
            recordId={id}
            object={TEMPLATE}
            content={recordData.content}
          />
        </div>
      </div>
    </>
  );
};

export default Template;
