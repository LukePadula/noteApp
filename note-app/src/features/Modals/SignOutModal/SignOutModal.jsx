import { useDispatch } from "react-redux";
import "./SignOutModal.css";
import {
  onModalOpenClose,
  onSignOutConfirm,
} from "../../../app/Slices/AppSlice";
import { useNavigate } from "react-router-dom";

const SignOutModal = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <div className="modal-content">
        <h1 className="modal-header">Sign out</h1>
        <p>Are you sure you want to sign out?</p>
        <div className="modal-actions">
          <button
            className="button-orange"
            onClick={() => {
              dispatch(onSignOutConfirm());
              navigate("/");
            }}
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
