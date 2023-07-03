import { createSlice } from "@reduxjs/toolkit";
import { EVENT, NOTE, TEMPLATE } from "../PredefinedValues";
const defaultRecordLookup = { id: "", title: "" };
const defaultcreateRecordFormData = {
  title: "",
  description: "",
  object: "",
  template: defaultRecordLookup,
  event: defaultRecordLookup,
};

const initialState = {
  modalType: null,
  searchInput: "",
  eventSearchInput: "",
  templateSearchInput: "",

  recordDetailsDropdownActive: false,
  userLoggedIn: false,
  createRecordFormData: defaultcreateRecordFormData,

  EVENT: [
    {
      id: "e5192561",
      title: "This is a event",
      status: "cancelled",
      startDateTime: "Today",
      showActions: false,
      object: "EVENT",
    },
    {
      id: "e1264526",
      title: "This is a event 2",
      status: "cancelled",
      startDateTime: "Today",
      showActions: false,
      object: "EVENT",
    },
  ],
  SUMMARY: [
    { note: "n1823190", category: "Positive", description: "Liked the UI" },
    { note: "n1823190", category: "Negative", description: "Too expensive" },
    {
      note: "n1823190",
      category: "Question",
      description: "What is the pricing for more than 10 licences",
    },
  ],
};

export const appSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    onQueryData: (state, action) => {
      console.log(action.payload);
      const { object, data } = action.payload;
      state[object] = data;
    },
    onActionMenuClick: (state, action) => {
      const record = state[action.payload.object].find(
        (item) => item.id === action.payload.id
      );

      if (record) {
        record.showActions = !record.showActions;
      }
    },
    onRecordDelete: (state, action) => {
      const index = state[action.payload.object].findIndex(
        (item) => item.id === action.payload.id
      );
      state[action.payload.object].splice(index, 1);
    },
    onModalOpenClose: (state, action) => {
      state.searchInput = "";
      state.modalType = action.payload;
      state.searchResults = undefined;
      state.createRecordFormData = defaultcreateRecordFormData;
    },
    onSignOutConfirm: (state, action) => {
      state.modalType = undefined;
      state.userLoggedIn = false;
    },
    onRecordCreate: (state, action) => {
      console.log(action.payload);
      state.modalType = undefined;
      const { title, description, object, template, event } =
        state.createRecordFormData;

      const newRecord = {
        id: "1234",
        title,
        description,
        created: new Date(),
        modified: new Date(),
        showActions: false,
      };

      if (object === NOTE) {
        newRecord.template = template;
        newRecord.event = event;

        if (newRecord.template) {
        }
      }
      state[object].push(newRecord);
      state.createRecordFormData = defaultcreateRecordFormData;
    },
    onSummaryRefresh: (state, action) => {
      console.log(action.payload.recordId);
      const index = state.NOTE.findIndex(
        (item) => item.id === action.payload.recordId
      );
      const record = state.NOTE[index];
      const questionSummary = [];
      const positiveSummary = [];
      const negativeSummary = [];

      if (record.content) {
        record.content.blocks.forEach((element) => {
          if (element.data.text) {
            switch (element.type) {
              case "question":
                questionSummary.push(element.data.text);
                break;
              case "positive":
                positiveSummary.push(element.data.text);
                break;
              case "negative":
                negativeSummary.push(element.data.text);
                break;
              default:
                break;
            }
          }
        });

        state.NOTE[index].summary = {
          question: questionSummary,
          positive: positiveSummary,
          negative: negativeSummary,
        };
      }
    },
    onSearch: (state, action) => {
      console.log(action.payload);
      if (action.payload.value) {
        const { value, searchObjects } = action.payload;
        const records = [];

        if (Array.isArray(searchObjects)) {
          searchObjects.forEach((object) => {
            records.push(...state[object]);
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
        state.templateSearchInput = undefined;
        state.searchInput = undefined;
      }
    },
    onSearchClear: (state, action) => {
      state.searchResults = undefined;
      state.templateSearchResults = undefined;
      state.eventSearchResults = undefined;
      state.templateSearchInput = undefined;
      state.searchInput = undefined;
      state.createRecordFormData.template = defaultRecordLookup;
    },
    onRecordLookupSelect: (state, action) => {
      const index = state.TEMPLATE.findIndex(
        (item) => item.id === action.payload.recordId
      );

      const { id, title } = state.TEMPLATE[index];
      state.createRecordFormData.template = { id, title };
      state.searchResults = undefined;
    },
    onTextEdit: (state, action) => {
      const { recordId, object, content } = action.payload;

      const index = state[object].findIndex((item) => item.id === recordId);
      state[object][index].content = content;
    },
    onDropDownOpenClose: (state, action) => {
      state.recordDetailsDropdownActive = !state.recordDetailsDropdownActive;
    },
    onLogin: (state, action) => {
      console.log("here");
      state.userLoggedIn = true;
    },
    onCreateRecordFormDataChange: (state, action) => {
      const { object, id, value } = action.payload;
      if (id !== "template") {
        state.createRecordFormData[id] = value;
        state.createRecordFormData.object = object;
      }
    },
    onRecordEdit: (state, action) => {
      const { recordId, object, formData } = action.payload;

      for (const key in formData) {
        console.log(key);
        state[object][index][key] = formData.key;
      }

      const index = state[object].findIndex((item) => item.id === recordId);
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
} = appSlice.actions;

export const selectNoteData = (state) => state.appSlice.NOTE;
export const selectTemplateData = (state) => state.appSlice.TEMPLATE;
export const selectEventData = (state) => state.appSlice.EVENT;
export const selectSummaryData = (state) => state.appSlice.SUMMARY;
export const selectRecordData = (state, payload) => {
  console.log(payload, "Here");
  console.log(state.appSlice);
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

export default appSlice.reducer;
