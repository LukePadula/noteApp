//Object types
export const NOTE = "NOTE";
export const TEMPLATE = "TEMPLATE";
export const EVENT = "EVENT";

export const LIST_HEADERS = {
  NOTE: ["Title", "Event", "Created", "Last modified"],
  TEMPLATE: ["Title", "Created", "Last modified"],
  EVENT: ["Title", "Status", "Start time"],
};

// Test data
export const TEST_DATA = {
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
};
