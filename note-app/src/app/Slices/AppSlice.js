import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  NOTE: [
    {
      id: "n1823190",
      title: "This is a note",
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
};

export const appSlice = createSlice({
  name: "appSlice",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
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
      console.log(action.payload.object);
      const index = state[action.payload.object].findIndex(
        (item) => item.id === action.payload.id
      );
      state[action.payload.object].splice(index, 1);
    },
    onRecordView: (state, action) => {
      console.log(action.payload.object);
    },
  },
  // The `extraReducers` field lets the slice handle
});

export const { onActionMenuClick, onRecordDelete, onRecordView } =
  appSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectNoteData = (state) => state.appSlice.NOTE;
export const selectTemplateData = (state) => state.appSlice.TEMPLATE;
export const selectEventData = (state) => state.appSlice.EVENT;

export default appSlice.reducer;
