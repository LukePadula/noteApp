import React from "react";
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import Login from "./features/pages/Login.jsx";
import Home from "./features/pages/Home.jsx";
import Template from "./features/pages/Template.jsx";
import Note from "./features/pages/Note.jsx";
import NavBar from "./features/NavBar/NavBar.jsx";
import Modal from "./features/Modal/Modal.jsx";

const App = () => {
  return (
    <>
      <NavBar page="home"></NavBar>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/template" element={<Template />} />
        <Route path="/note/:id" element={<Note />} />
      </Routes>
      <Modal />
    </>
  );
};

export default App;
