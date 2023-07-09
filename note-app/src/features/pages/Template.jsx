import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectRecordData } from "../../app/Slices/AppSlice";
import { TEMPLATE } from "../../app/PredefinedValues";
import TextEditor from "../TextEditor/TextEditor";
import RecordDetails from "../RecordDetails/RecordDetails";
import NavBar from "../NavBar/NavBar";

const Template = () => {
  const { id } = useParams();
  let recordData = useSelector((state) =>
    selectRecordData(state, { object: TEMPLATE, id })
  );

  if (!recordData) {
    return <h1 className="error">Something went wrong</h1>;
  }

  console.log("RECORD", recordData);

  return (
    <>
      <NavBar />
      <div className="page-content">
        <RecordDetails record={recordData} object={TEMPLATE} />
        <TextEditor
          record={recordData}
          recordId={id}
          object={TEMPLATE}
          content={recordData.content}
        />
      </div>
    </>
  );
};

export default Template;
