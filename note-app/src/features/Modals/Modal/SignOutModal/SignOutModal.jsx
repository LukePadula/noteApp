import { useSelector, useDispatch } from "react-redux";
import "../SignOutModal/SignOutModal.css";
import {
  onModalOpenClose,
  onSignOutConfirm,
} from "../../../../app/Slices/AppSlice";

const SignOutModal = (props) => {
  const dispatch = useDispatch();

  return (
    <>
      <div className="modal-content">
        <h1 className="modal-header">Sign out</h1>
        <p>Are you sure you want to sign out?</p>
        <div className="modal-actions">
          <button
            className="button-orange"
            onClick={() => dispatch(onSignOutConfirm())}
          >
            Sign out
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

export default SignOutModal;
