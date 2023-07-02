import React from "react";
import { selectModalType } from "./app/Slices/AppSlice";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import {
  getNoteData,
  getTemplateData,
} from "./app/DataControllers/DataController";

// Pages
import Login from "./features/pages/Login.jsx";
import Home from "./features/pages/Home.jsx";
import Template from "./features/pages/Template.jsx";
import Note from "./features/pages/Note.jsx";

//Modals
import Modal from "./features/Modals/Modal/ModalTemplate/Modal.jsx";
import SignOut from "./features/Modals/Modal/SignOutModal/SignOutModal.jsx";
import CreateRecordModal from "./features/Modals/Modal/CreateRecordModal/CreateRecordModal";
import SearchModal from "./features/Modals/Modal/SearchModal/SearchModal";

const App = () => {
  let modal = useSelector(selectModalType);
  let modalContent;
  let modalType;
  let modalObject;

  useEffect(() => {
    getNoteData();
    getTemplateData();
  }, []);

  if (modal) {
    modalType = modal.type;
    modalObject = modal.object;
  }
  console.log(modalType, "MODAL TYPE");

  switch (modalType) {
    case "signOut":
      modalContent = <SignOut />;
      break;

    case "createRecord":
      console.log("CREATE RECORD");
      modalContent = <CreateRecordModal object={modalObject} />;
      break;

    case "search":
      modalContent = <SearchModal />;
      break;

    default:
      break;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/template/:id" element={<Template />} />
        <Route path="/note/:id" element={<Note />} />
      </Routes>
      {modal && <Modal content={modalContent} />}
    </>
  );
};

export default App;
