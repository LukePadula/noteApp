import { NOTE, TEMPLATE, EVENT } from "../PredefinedValues";

export const generateId = () => {
  return crypto.randomUUID();
};

// Takes a object name and creates a UI friendly format for display.
export const generateObjectTitle = (text) => {
  if (typeof text === "string") {
    let textOutput = text.toLowerCase();
    textOutput = textOutput[0].toUpperCase() + textOutput.substring(1);

    return textOutput;
  }
  return text;
};

export const getObjectRoute = (object) => {
  console.log(object);
  switch (object) {
    case NOTE:
      return "notes";

    case TEMPLATE:
      return "templates";

    case EVENT:
      return "events";

    default:
      throw new Error("Invalid object type.");
  }
};
