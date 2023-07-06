import { useDispatch } from "react-redux";
import { NOTE, TEMPLATE } from "../../app/PredefinedValues";
import { onModalOpenClose } from "../../app/Slices/AppSlice";
import "./ListActions.css";

const ListActions = (props) => {
  const { object } = props;
  let listActionButtons;
  const dispatch = useDispatch();

  if (object === NOTE || object === TEMPLATE) {
    listActionButtons = (
      <button
        onClick={() => {
          dispatch(onModalOpenClose({ type: "createRecord", object }));
        }}
        className="button-orange-square list-button"
      >
        <span className="material-symbols-outlined">add</span>
      </button>
    );
  }

  return listActionButtons;
};

export default ListActions;
