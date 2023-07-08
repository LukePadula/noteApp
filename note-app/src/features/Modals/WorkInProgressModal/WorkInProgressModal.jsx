import { useDispatch } from "react-redux";
import { onModalOpenClose } from "../../../app/Slices/AppSlice";
import "./WorkInProgressModal.css";

const WorkInProgressModal = (props) => {
  const dispatch = useDispatch();

  return (
    <div id="work-in-progress-modal" className="modal-content">
      <h1 className="modal-header">Work in progress</h1>
      <p>Whoops... this hasn't been built yet</p>
      <div className="modal-actions">
        <button
          className="button-orange button-wide"
          onClick={() => dispatch(onModalOpenClose())}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default WorkInProgressModal;
