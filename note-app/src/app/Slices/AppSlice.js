import { createSlice } from "@reduxjs/toolkit";
import { EVENT, NOTE, TEMPLATE, TEMPLATE_AND_EVENT } from "../PredefinedValues";
import { generateId } from "../Utils/Utils";

const defaultRecordLookup = { id: "", title: "" };
const defaultcreateRecordFormData = {
  title: "",
  description: "",
  object: "",
  template: defaultRecordLookup,
  event: defaultRecordLookup,
};
const defaultDeleteRecordObject = {
  object: "",
  recordId: "",
};

const initialState = {
  modalType: null,
  searchInput: "",
  eventSearchInput: "",
  templateSearchInput: "",
  recordDetailsDropdownActive: false,
  userLoggedIn: false,
  createRecordFormData: defaultcreateRecordFormData,
  recordDelete: defaultDeleteRecordObject,
  titleValid: true,
  currentRecord: null,
  NOTE: [],
  TEMPLATE: [],
  EVENT: [],
  SUMMARY: [],
};

export const appSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    onActionMenuClick: (state, action) => {
      const record = state[action.payload.object].find(
        (item) => item.id === action.payload.id
      );

      if (record) {
        record.showActions = !record.showActions;
      }
    },
    onRecordDelete: (state, action) => {
      state.modalType = undefined;
    },
    onModalOpenClose: (state, action) => {
      if (action.payload === undefined) {
        state.searchInput = "";
        state.templateSearchInput = "";
        state.eventSearchInput = "";
        state.modalType = action.payload;
        state.searchResults = undefined;
        state.eventSearchResults = undefined;
        state.templateSearchResults = undefined;
        state.createRecordFormData = defaultcreateRecordFormData;
        state.titleValid = true;
      } else {
        state.modalType = action.payload;

        if (action.payload.type === "delete") {
          state.recordDelete = action.payload.recordDelete;
        } else {
          state.recordDelete = defaultDeleteRecordObject;
        }

        if (action.payload.type === "edit") {
          const { id, object, value } = action.payload;
          const index = state[object].findIndex((item) => item.id === id);
          const record = state[object][index];

          state.createRecordFormData = { ...record };
        }

        if (action.payload.type === "createRecord") {
          const { value } = action.payload;
          state.createRecordFormData.event = { ...value };
        }
      }
    },
    onSignOutConfirm: (state, action) => {
      state.modalType = undefined;
      state.loginError = false;
    },

    onSearch: (state, action) => {
      if (action.payload.value) {
        const { value, searchObjects } = action.payload;
        const records = [];

        if (Array.isArray(searchObjects)) {
          searchObjects.forEach((object) => {
            state[object].forEach((record) => {
              record.object = object;
              console.log(JSON.stringify(record));
              records.push(record);
            });
          });
          state.searchInput = value;

          state.searchResults = records.filter((item) =>
            item.title.toLowerCase().includes(value.toLowerCase())
          );
        } else {
          records.push(...state[searchObjects]);

          const results = records.filter((item) =>
            item.title.toLowerCase().includes(value.toLowerCase())
          );

          if (searchObjects === TEMPLATE) {
            state.templateSearchInput = value;
            state.templateSearchResults = results;
          } else if (searchObjects === EVENT) {
            state.eventSearchInput = value;
            state.eventSearchResults = results;
          }
        }
      } else {
        state.searchResults = undefined;
        state.templateSearchResults = undefined;
        state.eventSearchResults = undefined;
        state.templateSearchInput = "";
        state.eventSearchInput = "";
        state.searchInput = "";
      }
    },
    onSearchClear: (state, action) => {
      const { searchObjects } = action.payload;

      switch (searchObjects) {
        case EVENT:
          state.eventSearchInput = "";
          state.eventSearchResults = undefined;
          state.createRecordFormData.event = defaultRecordLookup;
          break;
        case TEMPLATE:
          state.templateSearchInput = "";
          state.templateSearchResults = undefined;
          state.createRecordFormData.template = defaultRecordLookup;
          break;
        case TEMPLATE_AND_EVENT:
          state.searchInput = "";
          state.searchResults = undefined;
        default:
          break;
      }
    },
    onRecordLookupSelect: (state, action) => {
      console.log(action.payload, "PL");
      const { recordId, searchObjects } = action.payload;
      const index = state[searchObjects].findIndex(
        (item) => item.id === recordId
      );
      const { id, title } = state[searchObjects][index];
      state.createRecordFormData[searchObjects.toLowerCase()] = { id, title };
      state.searchResults = undefined;
      state.templateSearchResults = undefined;
      state.eventSearchResults = undefined;
      state.eventSearchInput = "";
      state.templateSearchInput = "";
      state.searchInput = "";
    },
    onDropDownOpenClose: (state, action) => {
      state.recordDetailsDropdownActive = !state.recordDetailsDropdownActive;
    },
    onLogin: (state, action) => {
      state.userLoggedIn = true;
    },
    onCreateRecordFormDataChange: (state, action) => {
      const { object, id, value } = action.payload;
      if (id !== "template") {
        state.createRecordFormData[id] = value;
        state.createRecordFormData.object = object;
      }
    },
    onValidationError: (state, action) => {
      //Boolean
      state.titleValid = action.payload;
    },
    onDataLoad: (state, action) => {
      const { object, data, bulkLoad } = action.payload;

      if (bulkLoad) {
        state[object] = data;
      } else {
        state[object].push(data[0]);
      }
    },
    onCurrentRecordLoad: (state, action) => {
      state.currentRecord = action.payload[0];
    },
    onLoginError: (state, action) => {
      state.loginError = true;
    },
  },
});

export const {
  onQueryData,
  onActionMenuClick,
  onRecordDelete,
  onRecordView,
  onModalOpenClose,
  onSignOutConfirm,
  onSummaryRefresh,
  onRecordCreate,
  onTextEdit,
  onSearch,
  onDropDownOpenClose,
  onRecordLookupSelect,
  onSearchClear,
  onLogin,
  onCreateRecordFormDataChange,
  onRecordEdit,
  onValidationError,
  onDataLoad,
  onCurrentRecordLoad,
  onLoginError,
} = appSlice.actions;

export const selectNoteData = (state) => state.appSlice.NOTE;
export const selectTemplateData = (state) => state.appSlice.TEMPLATE;
export const selectEventData = (state) => state.appSlice.EVENT;
export const selectSummaryData = (state) => state.appSlice.SUMMARY;
export const selectRecordData = (state, payload) => {
  return state.appSlice[payload.object].find(
    (record) => record.id === payload.id
  );
};
export const selectModalType = (state) => state.appSlice.modalType;
export const selectSearchInput = (state) => state.appSlice.searchInput;
export const selectSearchResults = (state) => state.appSlice.searchResults;
export const selectRecordDetailsDropdownActive = (state) =>
  state.appSlice.recordDetailsDropdownActive;
export const selectCreateRecordFormData = (state) =>
  state.appSlice.createRecordFormData;
export const selectUserLoggedIn = (state) => state.appSlice.userLoggedIn;
export const selectEventSearchInput = (state) =>
  state.appSlice.eventSearchInput;
export const selectTemplateSearchInput = (state) =>
  state.appSlice.templateSearchInput;
export const selectTemplateSearchResults = (state) =>
  state.appSlice.templateSearchResults;
export const selectEventSearchResults = (state) =>
  state.appSlice.eventSearchResults;
export const selectRecordEdit = (state) => state.appSlice.recordEdit;
export const selectTitleValid = (state) => state.appSlice.titleValid;
export const selectCurrentRecord = (state) => state.appSlice.currentRecord;
export const selectRecordDelete = (state) => state.appSlice.recordDelete;
export const selectLoginError = (state) => state.appSlice.loginError;

export default appSlice.reducer;
