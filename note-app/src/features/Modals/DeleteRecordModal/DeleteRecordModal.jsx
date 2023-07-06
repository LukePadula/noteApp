import { useSelector, useDispatch } from "react-redux";
import AppSlice from "../../../app/Slices/AppSlice";
import { useNavigate } from "react-router-dom";
import { onModalOpenClose, onRecordDelete } from "../../../app/Slices/AppSlice";

const DeleteRecordModal = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log("rendered");

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
