import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentRecord } from "../../app/Slices/AppSlice";
import { TEMPLATE } from "../../app/PredefinedValues";
import TextEditor from "../TextEditor/TextEditor";
import RecordDetails from "../RecordDetails/RecordDetails";
import NavBar from "../NavBar/NavBar";
import { useEffect } from "react";
import { getRecords } from "../../app/Utils/Callouts";

const Template = () => {
  const { id } = useParams();
  let recordData = useSelector(selectCurrentRecord);

  useEffect(() => {
    const getData = async () => {
      getRecords(TEMPLATE, id);
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
