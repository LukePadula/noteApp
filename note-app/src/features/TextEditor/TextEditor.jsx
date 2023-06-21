import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import EditorJS from "@editorjs/editorjs";
import "../TextEditor/TextEditor.css";
import { useEffect } from "react";
// import Header from "@editorjs/header";
// import ImageTool from "@editorjs/image";
// import List from "@editorjs/list";

const TextEditor = (props) => {
  const { title, actions } = props;

  useEffect(() => {
    const editor = new EditorJS({
      /**
       * Id of Element that should contain the Editor
       */
      holder: "editorjs",
      placeholder: "Put your notes here...",
      autofocus: true,

      // tools: {
      //   header: {
      //     class: Header,
      //   },
      //   list: List,
      //   imageTool: ImageTool,
      // },
      data: { savedTextContent },
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
        <div class="tab" id="editorjs"></div>
      </div>
    </>
  );
};

export default TextEditor;
