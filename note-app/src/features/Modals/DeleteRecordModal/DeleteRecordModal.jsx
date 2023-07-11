import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { onModalOpenClose, onRecordDelete } from "../../../app/Slices/AppSlice";

const DeleteRecordModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <div className="modal-content">
        <h1 className="modal-header">Delete Record</h1>
        <p>Are you sure you want to delete this record?</p>
        <div className="modal-actions">
          <button
            className="button-orange"
            onClick={() => {
              navigate("/home");
              dispatch(onRecordDelete());
            }}
          >
            Delete
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

export default DeleteRecordModal;
