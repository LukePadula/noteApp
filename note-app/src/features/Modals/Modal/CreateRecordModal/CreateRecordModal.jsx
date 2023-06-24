import { useSelector, useDispatch } from "react-redux";
import "../SignOutModal/SignOutModal.css";
import {
  onModalOpenClose,
  onRecordCreate,
} from "../../../../app/Slices/AppSlice";
import { useNavigate } from "react-router-dom";
import "../CreateRecordModal/CreateRecordModal.css";
import { selectModalType } from "../../../../app/Slices/AppSlice";

const CreateRecordModal = (props) => {
  const { object } = props;
  const dispatch = useDispatch();
  const formTitle = object.toLowerCase();
  const formData = {
    recordName: "",
    recordDescription: "",
    recordObject: object,
  };

  const handleChange = (e) => {
    formData[e.target.id] = e.target.value;
  };

  return (
    <>
      <div id="createRecordModal" className="modal-content">
        <h1 className="modal-header">Create {formTitle}</h1>
        <form
          className="create-record-form"
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(onRecordCreate({ object, formData }));
          }}
        >
          <label className="record-create-input">
            Name
            <input type="text" id="recordName" onChange={handleChange} />
          </label>
          <label className="record-create-input">
            Description
            <textarea
              id="recordDescription"
              name=""
              cols="10"
              rows="5"
              onChange={handleChange}
              className="record-description"
            ></textarea>
          </label>
          <div className="modal-actions">
            <button className="button-orange" type="submit">
              Create
            </button>
            <button
              className="button-green"
              onClick={() => dispatch(onModalOpenClose())}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateRecordModal;
