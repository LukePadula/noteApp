import { createSlice } from "@reduxjs/toolkit";
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
  recordDetailsDropdownActive: false,
  userLoggedIn: false,
  createRecordFormData: defaultcreateRecordFormData,
  NOTE: [
    {
      id: "n1823190",
      title: "This is a note",
      eventName: "Event 1",
      created: "Today",
      modified: "Today",
      showActions: false,
      object: "NOTE",

      content: {
        time: 1687620792880,
        blocks: [
          {
            id: "wbDRvWqI8A",
            type: "paragraph",
            data: {
              text: "Hello this is already predefined text",
            },
          },
        ],
        version: "2.27.0",
      },
    },
    {
      id: "123",
      title: "This is a test",
      eventName: "Event 1",
      created: "Today",
      modified: "Today",
      showActions: false,
      object: "NOTE",
    },
    {
      id: "n7459431",
      title: "This is a note two",
      eventName: "Event 1",
      created: "Today",
      modified: "Today",
      showActions: false,
      object: "NOTE",
    },
  ],
  TEMPLATE: [
    {
      id: "t3424435",
      title: "This is a template",
      created: "Yesterday",
      modified: "Today",
      showActions: false,
      object: "TEMPLATE",
    },
    {
      id: "t3435245",
      title: "This is a template2",
      created: "Yesterday",
      modified: "Today",
      showActions: false,
      object: "TEMPLATE",
    },
  ],
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
      state.modalType = action.payload;
      state.searchResults = undefined;
      state.createRecordFormData = defaultcreateRecordFormData;
    },
    onSignOutConfirm: (state, action) => {
      state.modalType = undefined;
      state.userLoggedIn = false;
    },
    onRecordCreate: (state, action) => {
      console.log(action.payload.formData);
      state.modalType = undefined;
      const { recordObject, recordName, recordDescription } =
        action.payload.formData;
      state[recordObject].push({
        id: "1234",
        title: recordName,
        description: recordDescription,
        eventName: "Event 1",
        created: "Today",
        modified: "Today",
        showActions: false,
      });

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

      console.log(record.content);
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

        searchObjects.forEach((object) => {
          records.push(...state[object]);
        });

        const results = records.filter((item) =>
          item.title.toLowerCase().includes(value.toLowerCase())
        );
        state.searchInput = value;
        state.searchResults = results;
      } else {
        state.searchResults = undefined;
      }
    },
    onSearchClear: (state, action) => {
      state.searchInput = "";
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
      console.log(action.payload, "Change");
      const { id, value } = action.payload;
      if (id !== "template") {
        state.createRecordFormData[id] = value;
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
export const selectRecordData = (state, payload) =>
  state.appSlice[payload.object].find((record) => record.id === payload.id);
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

export default appSlice.reducer;
