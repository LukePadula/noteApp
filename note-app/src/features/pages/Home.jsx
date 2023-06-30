import ObjectList from "../ObjectList/ObjectList";
import { NOTE, TEMPLATE, EVENT } from "../../app/PredefinedValues";
import NavBar from "../NavBar/NavBar";
import "./Home.css";

const Home = () => {
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
