import { useSelector, useDispatch } from "react-redux";
import { selectShowModal } from "../../app/Slices/AppSlice";
import "../Modal/Modal.css";

const Modal = (props) => {
  const { header, body } = props;
  let showModal = useSelector(selectShowModal);
  //   let show = objectRecords;

  if (!showModal) {
    return null;
  }
  return (
    <>
      <div className="overlay">
        <div className="modal-cont">
          <div className="modal-header">YO{header}</div>
          <div className="modal-body">
            {body}
            <div className="modal-actions"></div>
          </div>
          <div className="modal-footer">
            <button>View</button>
            <button>Cancel</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
