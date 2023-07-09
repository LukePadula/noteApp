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
