import { useParams } from "react-router-dom";
import EditorJS from "@editorjs/editorjs";
import { useSelector, useDispatch } from "react-redux";
import "../TextEditor/TextEditor.css";
import { useEffect } from "react";
import { onTextEdit } from "../../app/Slices/AppSlice";
import { SimpleImage, Question, Positive, Negative } from "../../app/tools";
const TextEditor = (props) => {
  const { recordId, object, title, actions, content } = props;
  console.log(content);
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
        question: Question,
        positive: Positive,
        negative: Negative,
      },

      // tools: {
      //   image: SimpleImage,
      //   // header: {
      //   //   class: Header,
      //   // },
      //   // list: List,
      //   // imageTool: ImageTool,
      // },
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
