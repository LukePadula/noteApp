import { useSelector, useDispatch } from "react-redux";
import "../SignOutModal/SignOutModal.css";
import { onModalOpenClose } from "../../../../app/Slices/AppSlice";
import { useNavigate } from "react-router-dom";

const CreateRecordModal = (props) => {
  const { object } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <div className="modal-content">
        <h1 className="modal-header">Create {object}</h1>
        <div className="modal-actions">
          <button
            className="button-orange"
            onClick={() => {
              dispatch(onModalOpenClose());
            }}
          >
            Create
          </button>
          <button
            className="button-green"
            onClick={() => dispatch(onModalOpenClose())}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateRecordModal;
