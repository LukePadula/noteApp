import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./features/pages/Login.jsx";
import Home from "./features/pages/Home.jsx";
import Template from "./features/pages/Template.jsx";
import Note from "./features/pages/Note.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/template" element={<Template />} />
      <Route path="/note" element={<Note />} />
    </Routes>
  );
};

export default App;
