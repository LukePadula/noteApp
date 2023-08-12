import { useSelector, useDispatch } from "react-redux";
import "../SignOutModal/SignOutModal.css";
import {
  onModalOpenClose,
  onRecordCreate,
  onCreateRecordFormDataChange,
  onRecordEdit,
  onValidationError,
} from "../../../app/Slices/AppSlice";
import "./CreateModifyRecordModal.css";
import {
  selectCreateRecordFormData,
  selectTitleValid,
} from "../../../app/Slices/AppSlice";
import SearchField from "../../SearchField/SearchField";
import { EVENT, SELECT } from "../../../app/PredefinedValues";
import { TEMPLATE, NOTE } from "../../../app/PredefinedValues";
import { createRecord, updateRecord } from "../../../app/Utils/Callouts";

const Joi = require("joi");
var schema = Joi.object().keys({
  required: Joi.string().min(1).required(),
});

const CreateModifyRecordModal = (props) => {
  const { object, operation } = props;
  const dispatch = useDispatch();
  const formData = useSelector(selectCreateRecordFormData);

  const formTitle = object.toLowerCase();
  let formSubmitFunction;
  let formSubmitButtonLabel;
  let titleValid = useSelector(selectTitleValid);
  let templateFieldDisabled = false;

  const submitRecord = async (formData) => {
    operation === "createRecord"
      ? createRecord(object, formData)
      : updateRecord(object, formData.id, formData);
    dispatch(onModalOpenClose());
  };

  if (operation === "edit") {
    formSubmitFunction = onRecordEdit;
    formSubmitButtonLabel = "Save";
    templateFieldDisabled = true;
  } else {
    formSubmitFunction = onRecordCreate;
    formSubmitButtonLabel = "Create";
  }

  const validateInput = () => {
    const outcome = schema.validate(
      { required: formData.title },
      { abortEarly: false }
    );

    if (outcome.error) {
      dispatch(onValidationError(false));
      return false;
    } else {
      dispatch(onValidationError(true));
      return true;
    }
  };

  let recordSelectors;
  if (object === NOTE) {
    recordSelectors = (
      <>
        <label className="record-create-input">
          Event
          <SearchField
            searchAction={SELECT}
            value={formData.event.title}
            id="event"
            searchObjects={EVENT}
          />
        </label>
        <label className="record-create-input">
          Template
          <SearchField
            searchAction={SELECT}
            value={formData.template.title}
            id="template"
            searchObjects={TEMPLATE}
            disabled={templateFieldDisabled}
          />
        </label>
      </>
    );
  }

  return (
    <>
      <div id="createModifyRecordModal" className="modal-content">
        <h1 className="modal-header">
          {formSubmitButtonLabel} {formTitle}
        </h1>
        <form
          className="create-record-form"
          onChange={(e) =>
            dispatch(
              onCreateRecordFormDataChange({
                id: e.target.id,
                value: e.target.value,
                object,
              })
            )
          }
          onSubmit={(e) => {
            e.preventDefault();
            if (validateInput()) {
              submitRecord(formData);
            }
          }}
        >
          <label className="record-create-input required">
            Title
            <input
              placeholder={titleValid ? "" : "Title is required"}
              type="text"
              value={formData.title}
              id="title"
            />
          </label>
          {recordSelectors}
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
              {formSubmitButtonLabel}
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

export default CreateModifyRecordModal;
