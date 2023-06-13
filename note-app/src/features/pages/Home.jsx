import ObjectList from "../ObjectList/ObjectList";
import NavBar from "../NavBar/NavBar";
import { NOTE, TEMPLATE, EVENT } from "../../app/PredefinedValues";

const Home = () => {
  return (
    <>
      <NavBar page="home"></NavBar>
      <h1>Home</h1>
      <div>
        <ObjectList object={NOTE} />
      </div>
      <div>
        <ObjectList object={TEMPLATE} />
      </div>
      <div>
        <ObjectList object={EVENT} />
      </div>
    </>
  );
};

export default Home;
