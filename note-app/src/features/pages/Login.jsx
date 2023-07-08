import "./Login.css";
import { useDispatch } from "react-redux";
import { onLogin } from "../../app/Slices/AppSlice";
import { useNavigate } from "react-router-dom";
import { onModalOpenClose } from "../../app/Slices/AppSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="login-cont">
      <div className="login-form">
        <h1 className="login-title">Login</h1>
        <div className="login-input">
          <label htmlFor="username">Username</label>
          <input id="username" type="text" />
        </div>
        <div className="login-input">
          <label htmlFor="password">Password</label>
          <input id="password" type="text" />
        </div>

        <div className="login-actions">
          <button
            className="button-green"
            onClick={() => {
              dispatch(onLogin());
              navigate("/home");
            }}
          >
            Login
          </button>
          <button
            onClick={() => dispatch(onModalOpenClose({ type: "wip" }))}
            className="button-orange"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
