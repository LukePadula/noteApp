import React from "react";
import { selectModalType } from "./app/Slices/AppSlice";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Login from "./features/pages/Login.jsx";
import Home from "./features/pages/Home.jsx";
import Template from "./features/pages/Template.jsx";
import Note from "./features/pages/Note.jsx";

import Modal from "./features/Modals/ModalTemplate/Modal";
import SignOutModal from "./features/Modals/SignOutModal/SignOutModal";
import CreateModifyRecordModal from "./features/Modals/CreateModifyRecordModal/CreateModifyRecordModal";
import SearchModal from "./features/Modals/SearchModal/SearchModal";
import DeleteRecordModal from "./features/Modals/DeleteRecordModal/DeleteRecordModal";
import WorkInProgressModal from "./features/Modals/WorkInProgressModal/WorkInProgressModal";

const App = () => {
  let modal = useSelector(selectModalType);
  let modalContent;
  let modalType;
  let modalObject;

  if (modal) {
    modalType = modal.type;
    modalObject = modal.object;
  }

  switch (modalType) {
    case "signOut":
      modalContent = <SignOutModal />;
      break;

    case "createRecord":
      modalContent = (
        <CreateModifyRecordModal object={modalObject} operation={modalType} />
      );
      break;

    case "edit":
      modalContent = (
        <CreateModifyRecordModal object={modalObject} operation={modalType} />
      );
      break;

    case "search":
      modalContent = <SearchModal />;
      break;

    case "delete":
      modalContent = <DeleteRecordModal />;
      break;

    case "wip":
      modalContent = <WorkInProgressModal />;
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
