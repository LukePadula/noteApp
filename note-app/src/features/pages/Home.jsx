import ObjectList from "../ObjectList/ObjectList";
import { NOTE, TEMPLATE, EVENT } from "../../app/PredefinedValues";

const Home = () => {
  return (
    <>
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
