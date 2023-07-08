export const generateId = () => {};

// Takes a object name and creates a UI friendly format for display.
export const generateObjectTitle = (text) => {
  let textOutput = text.toLowerCase();
  textOutput = textOutput[0].toUpperCase() + textOutput.substring(1);

  return textOutput;
};
