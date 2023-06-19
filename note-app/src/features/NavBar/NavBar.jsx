import { useSelector, useDispatch } from "react-redux";
import "./NavBar.css";
import { onModalOpenClose } from "../../app/Slices/AppSlice";

const ObjectContainer = (props) => {
  const dispatch = useDispatch();

  return (
    <nav>
      <div className="page-title">
        <h1>Noted</h1>
      </div>
      <div className="nav-actions">
        <button className="search">Q</button>
        <button className="home">Home</button>
        <button
          className="sign-out"
          onClick={() => dispatch(onModalOpenClose("signOut"))}
        >
          Sign out
        </button>
      </div>
    </nav>
  );
};

export default ObjectContainer;
