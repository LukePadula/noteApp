import { useSelector, useDispatch } from "react-redux";
import "./NavBar.css";

const ObjectContainer = (props) => {
  const { page } = props;
  return (
    <nav>
      <div className="page-title">
        <h1>{page}</h1>
      </div>
      <div className="search-bar">
        <input type="text" />
      </div>
      <div className="nav-actions">+</div>
    </nav>
  );
};

export default ObjectContainer;
