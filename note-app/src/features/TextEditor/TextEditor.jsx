import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import { useDispatch } from "react-redux";
import "../TextEditor/TextEditor.css";
import { useEffect } from "react";
import { onTextEdit } from "../../app/Slices/AppSlice";
import { Question, Positive, Negative } from "../../app/tools";
import { NOTE } from "../../app/PredefinedValues";
import { generateObjectTitle } from "../../app/Utils/Utils";
import { updateRecord } from "../../app/Utils/Callouts";

const TextEditor = (props) => {
  const dispatch = useDispatch();
  console.log(props);
  const { object, record } = props;
  const { id, content } = record;
  let editorObjectTitle = generateObjectTitle(object);

  const submitRecordText = async (content) => {
    console.log(content);
    updateRecord(object, record[0].id, { content });
  };

  const noteTools = {
    header: {
      class: Header,
    },
    question: Question,
    positive: Positive,
    negative: Negative,
  };

  const templateTools = {
    header: {
      class: Header,
    },
  };

  useEffect(() => {
    const editor = new EditorJS({
      holder: "editorjs",
      autofocus: true,
      onChange: async () => {
        let content = await editor.saver.save();
        console.log(content);
        await submitRecordText(content.blocks);
        // dispatch(onTextEdit({ id, object, content }));
      },
      tools: object === NOTE ? noteTools : templateTools,
      data: content,
    });
  }, []);

  let lastEdited;
  if (content) {
    lastEdited = new Date(content.time).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  }

  return (
    <>
      <div className="editor-cont">
        <h1>{editorObjectTitle}</h1>
        <div className="modified-cont">
          {content && <small>Last edited: {lastEdited}</small>}
        </div>
        <div className="tab" id="editorjs"></div>
      </div>
    </>
  );
};

export default TextEditor;
