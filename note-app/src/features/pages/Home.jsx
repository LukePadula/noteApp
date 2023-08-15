import ObjectList from "../ObjectList/ObjectList";
import React, { useEffect } from "react";
import { NOTE, TEMPLATE, EVENT } from "../../app/PredefinedValues";
import NavBar from "../NavBar/NavBar";
import "./Home.css";
import { useDispatch } from "react-redux";
import { onCurrentRecordDeLoad } from "../../app/Slices/AppSlice";
import { getRecords } from "../../app/Utils/Callouts";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      dispatch(onCurrentRecordDeLoad());
      await getRecords(NOTE);
      await getRecords(TEMPLATE);
      await getRecords(EVENT);
    };

    getData();
  }, []);

  return (
    <>
      <NavBar />
      <div id="home-page-content">
        <ObjectList object={NOTE} />
        <ObjectList object={TEMPLATE} />
        <ObjectList object={EVENT} />
      </div>
    </>
  );
};

export default Home;
