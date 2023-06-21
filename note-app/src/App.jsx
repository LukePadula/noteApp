import React from "react";
import { selectModalType } from "./app/Slices/AppSlice";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import Login from "./features/pages/Login.jsx";
import Home from "./features/pages/Home.jsx";
import Template from "./features/pages/Template.jsx";
import Note from "./features/pages/Note.jsx";
import NavBar from "./features/NavBar/NavBar.jsx";

import Modal from "./features/Modals/Modal/ModalTemplate/Modal.jsx";
import SignOut from "./features/Modals/Modal/SignOutModal/SignOutModal.jsx";
import CreateRecordModal from "./features/Modals/Modal/CreateRecordModal/CreateRecordModal";
import SearchModal from "./features/Modals/Modal/SearchModal/SearchModal";
const App = () => {
  let modalType = useSelector(selectModalType);
  let modalContent;

  console.log(modalType);

  switch (modalType) {
    case "signOut":
      modalContent = <SignOut />;
      break;

    case "createRecord":
      modalContent = <CreateRecordModal />;
      break;

    case "search":
      modalContent = <SearchModal />;
      break;

    default:
      break;
  }

  return (
    <>
      <NavBar page="home"></NavBar>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/template" element={<Template />} />
        <Route path="/note/:id" element={<Note />} />
      </Routes>
      {modalType && <Modal content={modalContent} />}
    </>
  );
};

export default App;
