import { useDispatch } from "react-redux";
import { onModalOpenClose } from "../../app/Slices/AppSlice";
import { Link } from "react-router-dom";
import { NOTE, TEMPLATE, EVENT } from "../../app/PredefinedValues";

const RecordActions = (props) => {
  const { object, id, title } = props;
  const dispatch = useDispatch();
  let recordButtonActions;
  let recordButtonActionsContainer;

  if (object === NOTE || object === TEMPLATE) {
    recordButtonActions = (
      <div className="record-actions">
        <div>
          <Link to={`/${object.toLowerCase()}/${id}`}>View</Link>
        </div>
        <div
          onClick={() =>
            dispatch(
              onModalOpenClose({
                type: "delete",
                recordDelete: { object, recordId: id },
              })
            )
          }
        >
          Delete
        </div>
      </div>
    );

    recordButtonActionsContainer = (
      <>
        <button className="actions-cont">
          <span className="material-symbols-outlined">expand_more</span>
          {recordButtonActions}
        </button>
      </>
    );
  } else if (object === EVENT) {
    recordButtonActionsContainer = (
      <button
        onClick={() => {
          dispatch(
            onModalOpenClose({
              type: "createRecord",
              object: NOTE,
              value: { id, title },
            })
          );
        }}
        className="actions-cont event-action"
      >
        <span className="material-symbols-outlined">add</span>
      </button>
    );
  }

  return <> {recordButtonActionsContainer}</>;
};

export default RecordActions;
