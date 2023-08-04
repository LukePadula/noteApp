import ObjectList from "../ObjectList/ObjectList";
import React, { useEffect } from "react";
import { NOTE, TEMPLATE, EVENT } from "../../app/PredefinedValues";
import NavBar from "../NavBar/NavBar";
import "./Home.css";
import { useDispatch } from "react-redux";
import { onDataLoad } from "../../app/Slices/AppSlice";
import { getRecords } from "../../app/Utils/Callouts";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      const notesData = await getRecords(NOTE);
      dispatch(onDataLoad({ object: NOTE, data: notesData }));

      const templatesData = await getRecords(TEMPLATE);
      dispatch(onDataLoad({ object: TEMPLATE, data: templatesData }));

      const eventsData = await getRecords(EVENT);
      dispatch(onDataLoad({ object: EVENT, data: eventsData }));
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
