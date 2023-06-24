import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalType: null,
  NOTE: [
    {
      id: "n1823190",
      title: "This is a note",
      eventName: "Event 1",
      created: "Today",
      modified: "Today",
      showActions: false,

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
    },
    {
      id: "n7459431",
      title: "This is a note two",
      eventName: "Event 1",
      created: "Today",
      modified: "Today",
      showActions: false,
    },
  ],
  TEMPLATE: [
    {
      id: "t3424435",
      title: "This is a template",
      created: "Yesterday",
      modified: "Today",
      showActions: false,
    },
    {
      id: "t3435245",
      title: "This is a template2",
      created: "Yesterday",
      modified: "Today",
      showActions: false,
    },
  ],
  EVENT: [
    {
      id: "e5192561",
      title: "This is a event",
      status: "cancelled",
      startDateTime: "Today",
      showActions: false,
    },
    {
      id: "e1264526",
      title: "This is a event 2",
      status: "cancelled",
      startDateTime: "Today",
      showActions: false,
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
    },
    onSignOutConfirm: (state, action) => {
      state.modalType = undefined;
    },
    onRecordCreate: (state, action) => {
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
    },
    onSummaryRefresh: (state, action) => {},
    onSearch: (state, action) => {
      if (action.payload) {
        const results = state.NOTE.filter((item) =>
          item.title.toLowerCase().includes(action.payload.toLowerCase())
        );
        state.searchResults = results;
      } else {
        state.searchResults = undefined;
      }
    },
    onTextEdit: (state, action) => {
      const { recordId, object, content } = action.payload;
      const record = state[object].find((item) => item.id === recordId);
      record.content = content;
      console.log(content);
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
} = appSlice.actions;

export const selectNoteData = (state) => state.appSlice.NOTE;
export const selectTemplateData = (state) => state.appSlice.TEMPLATE;
export const selectEventData = (state) => state.appSlice.EVENT;
export const selectSummaryData = (state) => state.appSlice.SUMMARY;
export const selectRecordData = (state, payload) =>
  state.appSlice[payload.object].find((record) => record.id == payload.id);
export const selectModalType = (state) => state.appSlice.modalType;
export const selectSearchInput = (state) => state.appSlice.searchInput;
export const selectSearchResults = (state) => state.appSlice.searchResults;

export default appSlice.reducer;
