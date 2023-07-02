import { store } from "../store";
import { NOTE, TEMPLATE } from "../PredefinedValues";
import { onQueryData } from "../Slices/AppSlice";
// import { google } from "googleapis";

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

// export const getEventData = async () => {
//   const state = store.getState();

//   let tokenClient;
//   let gapiInited = false;
//   let gisInited = false;

//   function gisLoaded() {
//     tokenClient = google.accounts.oauth2.initTokenClient({
//       client_id: CLIENT_ID,
//       scope: SCOPES,
//       callback: "", // defined later
//     });
//     gisInited = true;
//   }

//   function handleAuthClick() {
//     tokenClient.callback = async (resp) => {
//       if (resp.error !== undefined) {
//         throw resp;
//       }
//       document.getElementById("signout_button").style.visibility = "visible";
//       document.getElementById("authorize_button").innerText = "Refresh";
//       await listUpcomingEvents();
//     };

//     if (gapi.client.getToken() === null) {
//       // Prompt the user to select a Google Account and ask for consent to share their data
//       // when establishing a new session.
//       tokenClient.requestAccessToken({ prompt: "consent" });
//     } else {
//       // Skip display of account chooser and consent dialog for an existing session.
//       tokenClient.requestAccessToken({ prompt: "" });
//     }
//   }

//   //Set data

//   async function listUpcomingEvents() {
//     let response;
//     try {
//       const request = {
//         calendarId: "primary",
//         timeMin: new Date().toISOString(),
//         showDeleted: false,
//         singleEvents: true,
//         maxResults: 10,
//         orderBy: "startTime",
//       };
//       response = await gapi.client.calendar.events.list(request);
//     } catch (err) {
//       document.getElementById("content").innerText = err.message;
//       return;
//     }

//     const events = response.result.items;
//   }

//   store.dispatch(onQueryData({ object: TEMPLATE, data: TEMPLATE_DATA }));
// };
