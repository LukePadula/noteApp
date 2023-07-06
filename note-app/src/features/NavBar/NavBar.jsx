import { useDispatch } from "react-redux";
import "./NavBar.css";
import { onModalOpenClose } from "../../app/Slices/AppSlice";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <nav>
      <div className="page-title">
        <h1 onClick={() => navigate("/home")} className="title">
          Noted
        </h1>
      </div>
      <div className="nav-actions">
        <button
          className="search material-symbols-outlined"
          onClick={() => dispatch(onModalOpenClose({ type: "search" }))}
        >
          <span className="material-symbols-outlined">search</span>
        </button>
        <button onClick={() => navigate("/home")} className="home">
          Home
        </button>
        <button
          className="sign-out"
          onClick={() => {
            dispatch(onModalOpenClose({ type: "signOut" }));
          }}
        >
          Sign out
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
