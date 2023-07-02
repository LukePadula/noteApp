import { useSelector, useDispatch } from "react-redux";
import "./Modal.css";
import { onModalOpenClose } from "../../../../app/Slices/AppSlice";

const Modal = (props) => {
  const { content } = props;
  const dispatch = useDispatch();

  return (
    <>
      <div className="overlay">
        <div className="modal-cont">
          <div
            className="exit-modal"
            onClick={() => dispatch(onModalOpenClose())}
          >
            <span class="material-symbols-outlined">close</span>
          </div>
          {content}
        </div>
      </div>
    </>
  );
};

export default Modal;
