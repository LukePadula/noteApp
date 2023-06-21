import { useSelector, useDispatch } from "react-redux";
import "../SignOutModal/SignOutModal.css";
import { onModalOpenClose } from "../../../../app/Slices/AppSlice";
import { useNavigate } from "react-router-dom";

const SearchModal = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <div className="modal-content">
        <h1 className="modal-header">Search</h1>
        <div className="modal-actions">
          <button
            className="button-orange"
            onClick={() => {
              dispatch(onModalOpenClose());
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchModal;
