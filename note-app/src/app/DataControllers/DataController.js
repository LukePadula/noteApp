import { store } from "../store";
import { NOTE, TEMPLATE } from "../PredefinedValues";
import { onQueryData } from "../Slices/AppSlice";

//Google API
const CLIENT_ID =
  "147997563216-8bgvidsfp7k9opuu99lmfqmvgpgkmt5c.apps.googleusercontent.com";
const API_KEY = "AIzaSyD9cw0UntAdhEPsyFizPWA_ljcUBXDTy2k";
const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

//Test data
const NOTE_DATA = [
  {
    id: "n1823190",
    title: "This is a note",
    eventName: "Event 1",
    created: new Date(),
    modified: new Date(),
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
    created: new Date(),
    modified: new Date(),
    showActions: false,
    object: "NOTE",
  },
  {
    id: "n7459431",
    title: "This is a note two",
    eventName: "Event 1",
    created: new Date(),
    modified: new Date(),
    showActions: false,
    object: "NOTE",
  },
];

const TEMPLATE_DATA = [
  {
    id: "t3424435",
    title: "This is a template",
    created: new Date(),
    modified: new Date(),
    showActions: false,
    object: "TEMPLATE",
  },
  {
    id: "t3435245",
    title: "This is a template2",
    created: new Date(),
    modified: new Date(),
    showActions: false,
    object: "TEMPLATE",
  },
];

export const getNoteData = async () => {
  const state = store.getState();
  // Mock callout
  try {
    setTimeout(() => {
      store.dispatch(onQueryData({ object: NOTE, data: NOTE_DATA }));
    }, 400);
  } catch (error) {
    console.log(error);
  }
};

export const getTemplateData = async () => {
  const state = store.getState();
  // Mock callout
  try {
    setTimeout(() => {
      store.dispatch(onQueryData({ object: TEMPLATE, data: TEMPLATE_DATA }));
    }, 400);
  } catch (error) {
    console.log(error);
  }
};
