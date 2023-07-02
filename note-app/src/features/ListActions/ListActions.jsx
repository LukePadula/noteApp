import { useDispatch } from "react-redux";
import { NOTE, TEMPLATE } from "../../app/PredefinedValues";
import { onModalOpenClose } from "../../app/Slices/AppSlice";
import { useNavigate } from "react-router-dom";
import "./ListActions.css";

const ListActions = (props) => {
  const { object } = props;
  let listActionButtons;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (object === NOTE || object === TEMPLATE) {
    listActionButtons = (
      <button
        onClick={() => {
          dispatch(onModalOpenClose({ type: "createRecord", object }));
        }}
        className="button-orange-square list-button"
      >
        <span class="material-symbols-outlined">add</span>
      </button>
    );
  }

  return listActionButtons;
};

export default ListActions;
