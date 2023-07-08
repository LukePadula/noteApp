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
  NOTE: [
    {
      id: "n1823190",
      title: "Client meeting",
      eventName: "Event 1",
      created: new Date(),
      modified: new Date(),
      showActions: false,
      object: "NOTE",
      template: defaultRecordLookup,
      event: defaultRecordLookup,
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
      title: "Internal meeting",
      eventName: "Event 1",
      created: new Date(),
      modified: new Date(),
      showActions: false,
      object: "NOTE",
      template: defaultRecordLookup,
      event: defaultRecordLookup,
    },
    {
      id: "n7459431",
      title: "Client sales call",
      eventName: "Event 1",
      created: new Date(),
      modified: new Date(),
      showActions: false,
      object: "NOTE",
      template: defaultRecordLookup,
      event: defaultRecordLookup,
    },
  ],

  TEMPLATE: [
    {
      id: "t3424435",
      title: "Sales template",
      created: new Date(),
      modified: new Date(),
      showActions: false,
      object: "TEMPLATE",
      content: {
        time: 1688731860495,
        blocks: [
          {
            id: "EDDAw9-Nk6",
            type: "header",
            data: {
              text: "Introduction",
              level: 2,
            },
          },
          {
            id: "TOQbFvCG97",
            type: "paragraph",
            data: {
              text: "- About us",
            },
          },
          {
            id: "AwcgExYt6_",
            type: "paragraph",
            data: {
              text: "- Meeting outline",
            },
          },
          {
            id: "RfdiSKATmM",
            type: "header",
            data: {
              text: "Identify client process",
              level: 2,
            },
          },
          {
            id: "a9mhnXaRcz",
            type: "paragraph",
            data: {
              text: "- Day to day process",
            },
          },
          {
            id: "pvG3a-omV9",
            type: "paragraph",
            data: {
              text: "- Wants and needs",
            },
          },
          {
            id: "oVEpSPp4OP",
            type: "paragraph",
            data: {
              text: "- main problems",
            },
          },
          {
            id: "63U70kZuYD",
            type: "header",
            data: {
              text: "Demo product",
              level: 2,
            },
          },
          {
            id: "Li0ToogOgX",
            type: "header",
            data: {
              text: "Client questions and feedback",
              level: 2,
            },
          },
        ],
        version: "2.27.0",
      },
    },
  ],
  EVENT: [
    {
      id: "e5192561",
      title: "This is a event",
      status: "Accepted",
      startDateTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      showActions: false,
      object: "EVENT",
    },
    {
      id: "e1264526",
      title: "This is a event 2",
      status: "Cancelled",
      startDateTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
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
      const index = state[state.recordDelete.object].findIndex(
        (item) => item.id === state.recordDelete.recordId
      );
      state[state.recordDelete.object].splice(index, 1);
      state.modalType = undefined;
    },
    onModalOpenClose: (state, action) => {
      console.log(action.payload);
      if (action.payload === undefined) {
        state.searchInput = "";
        state.templateSearchInput = "";
        state.eventSearchInput = "";
        state.modalType = action.payload;
        state.searchResults = undefined;
        state.createRecordFormData = defaultcreateRecordFormData;
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
      state.userLoggedIn = false;
    },
    onRecordCreate: (state, action) => {
      state.modalType = undefined;
      const { title, description, object, template, event } =
        state.createRecordFormData;

      console.log(JSON.stringify(template), "TEMPLATE");
      const newRecord = {
        id: "1234",
        title,
        description,
        created: new Date(),
        modified: new Date(),
        showActions: false,
      };

      if (object === NOTE) {
        const index = state[TEMPLATE].findIndex(
          (item) => item.id === template.id
        );

        index >= 0
          ? (newRecord.content = state[TEMPLATE][index].content)
          : (newRecord.content = undefined);
        newRecord.template = { ...template };
        newRecord.event = { ...event };
      }
      state[object].push(newRecord);
      state.createRecordFormData = defaultcreateRecordFormData;
    },
    onRecordEdit: (state, action) => {
      const { object } = state.createRecordFormData;
      const index = state[object].findIndex(
        (item) => item.id === state.createRecordFormData.id
      );

      state[object][index] = {
        ...state.createRecordFormData,
        modified: new Date(),
      };
    },
    onSummaryRefresh: (state, action) => {
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
      state.templateSearchResults = undefined;
      state.eventSearchResults = undefined;
      state.templateSearchInput = undefined;
      state.searchInput = undefined;
    },
    onTextEdit: (state, action) => {
      const { id, object, content } = action.payload;
      const index = state[object].findIndex((item) => item.id === id);
      state[object][index].content = { ...content };
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

export default appSlice.reducer;
