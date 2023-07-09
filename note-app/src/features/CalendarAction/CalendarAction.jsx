import { useDispatch } from "react-redux";
import { onModalOpenClose } from "../../app/Slices/AppSlice";
import "./CalendarAction.css";

const CalendarAction = (props) => {
  const { label } = props;
  const dispatch = useDispatch();

  return (
    <div className="calendar-action-cont">
      <button
        onClick={() => {
          dispatch(onModalOpenClose({ type: "wip" }));
        }}
        className="calendar-action button-orange"
      >
        {label}
      </button>
    </div>
  );
};

export default CalendarAction;
