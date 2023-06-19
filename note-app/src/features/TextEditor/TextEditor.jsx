import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import EditorJS from "@editorjs/editorjs";
import "../TextEditor/TextEditor.css";
import { useEffect } from "react";
// import Header from "@editorjs/header";
// import ImageTool from "@editorjs/image";
// import List from "@editorjs/list";

const TextEditor = () => {
  // Get text if there is any
  let savedTextContent;
  let textContent;

  const editor = new EditorJS({
    /**
     * Id of Element that should contain the Editor
     */
    holder: "editorjs",
    placeholder: "Put your notes here...",

    // tools: {
    //   header: {
    //     class: Header,
    //   },
    //   list: List,
    //   imageTool: ImageTool,
    // },
  });

  if (savedTextContent) {
    textContent = textContent;
  }

  return (
    <>
      <div className="editor-cont">
        <div class="tab" id="editorjs"></div>
      </div>
    </>
  );
};

export default TextEditor;
