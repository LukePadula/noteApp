import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  TEST_DATA: {
    NOTE: [
      {
        title: "This is a note",
        eventName: "Event 1",
        created: "Today",
        modified: "Today",
      },
      {
        title: "This is a note two",
        eventName: "Event 1",
        created: "Today",
        modified: "Today",
      },
    ],
    TEMPLATE: [
      {
        title: "This is a template",
        created: "Yesterday",
        modified: "Today",
      },
      {
        title: "This is a template2",
        created: "Yesterday",
        modified: "Today",
      },
    ],
    EVENT: [
      {
        title: "This is a event",
        status: "cancelled",
        startDateTime: "Today",
      },
      {
        title: "This is a event 2",
        status: "cancelled",
        startDateTime: "Today",
      },
    ],
  },
};

export const appSlice = createSlice({
  name: "appSlice",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
  // The `extraReducers` field lets the slice handle
});

// export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectTestData = (state) => state.appSlice.TEST_DATA;

export default appSlice.reducer;
