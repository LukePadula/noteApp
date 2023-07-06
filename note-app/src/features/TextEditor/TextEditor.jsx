import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";

import { useDispatch } from "react-redux";
import "../TextEditor/TextEditor.css";
import { useEffect } from "react";
import { onTextEdit } from "../../app/Slices/AppSlice";
import { Question, Positive, Negative } from "../../app/tools";

const TextEditor = (props) => {
  const { recordId, object, title, actions, content } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    const editor = new EditorJS({
      holder: "editorjs",
      autofocus: true,
      onChange: async () => {
        let content = await editor.saver.save();
        dispatch(onTextEdit({ recordId, object, content }));
      },
      tools: {
        header: {
          class: Header,
        },
        question: Question,
        positive: Positive,
        negative: Negative,
      },
      data: content,
    });
  }, []);

  // Get text if there is any
  const { savedTextContent } = props;
  let textContent;
  //Get presaved data.

  if (savedTextContent) {
    textContent = textContent;
  }

  return (
    <>
      <div className="editor-cont">
        <h1>{title}</h1>
        <div className="tab" id="editorjs"></div>
      </div>
    </>
  );
};

export default TextEditor;
