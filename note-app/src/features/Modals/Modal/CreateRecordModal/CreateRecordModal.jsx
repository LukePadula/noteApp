import { useSelector, useDispatch } from "react-redux";
import "../SignOutModal/SignOutModal.css";
import {
  onModalOpenClose,
  onRecordCreate,
  onCreateRecordFormDataChange,
} from "../../../../app/Slices/AppSlice";
import "../CreateRecordModal/CreateRecordModal.css";
import { selectCreateRecordFormData } from "../../../../app/Slices/AppSlice";
import SearchField from "../../../SearchField/SearchField";
import { EVENT, SELECT } from "../../../../app/PredefinedValues";
import { TEMPLATE, NOTE } from "../../../../app/PredefinedValues";

const CreateRecordModal = (props) => {
  const { object } = props;
  const dispatch = useDispatch();
  const formTitle = object.toLowerCase();
  const formData = useSelector(selectCreateRecordFormData);

  console.log(object);

  const templateSelector = (
    <>
      <label className="record-create-input">
        Event
        <SearchField
          searchAction={SELECT}
          value={formData.event.title}
          id="event"
          searchObjects={[EVENT]}
        />
      </label>
      <label className="record-create-input">
        Template
        <SearchField
          searchAction={SELECT}
          value={formData.template.title}
          id="template"
          searchObjects={[TEMPLATE]}
        />
      </label>
    </>
  );
  return (
    <>
      <div id="createRecordModal" className="modal-content">
        <h1 className="modal-header">Create {formTitle}</h1>
        <form
          className="create-record-form"
          onChange={(e) =>
            dispatch(
              onCreateRecordFormDataChange({
                id: e.target.id,
                value: e.target.value,
              })
            )
          }
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(onRecordCreate({ object, formData }));
          }}
        >
          <label className="record-create-input">
            Name
            <input type="text" value={formData.title} id="title" />
          </label>
          {object === NOTE && templateSelector}
          <label className="record-create-input">
            Description
            <textarea
              id="description"
              name=""
              cols="10"
              rows="5"
              className="record-description"
              value={formData.description}
            ></textarea>
          </label>
          <div className="modal-actions">
            <button className="button-orange" type="submit">
              Create
            </button>
            <button
              className="button-green"
              onClick={() => dispatch(onModalOpenClose())}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateRecordModal;
