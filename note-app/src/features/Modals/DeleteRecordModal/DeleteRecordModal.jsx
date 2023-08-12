import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  onModalOpenClose,
  onDataLoad,
  onRecordDelete,
} from "../../../app/Slices/AppSlice";
import axios from "axios";
import { selectRecordDelete } from "../../../app/Slices/AppSlice";
import { deleteRecord } from "../../../app/Utils/Callouts";
import { object } from "joi";

const DeleteRecordModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let recordToDelete = useSelector(selectRecordDelete);

  const deleteaRecord = async () => {
    await deleteRecord(recordToDelete.object, recordToDelete.recordId);
  };

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

              deleteaRecord();

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
