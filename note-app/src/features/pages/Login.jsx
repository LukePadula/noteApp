import "./Login.css";
import { useDispatch } from "react-redux";
import { onLogin } from "../../app/Slices/AppSlice";
import { useNavigate } from "react-router-dom";
import { onModalOpenClose } from "../../app/Slices/AppSlice";
import { userLogin } from "../../app/Utils/Callouts";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginCreds = {
    email: "",
    password: "",
  };

  const inputChange = (e) => {
    loginCreds[e.target.id] = e.target.value;
  };

  return (
    <div className="login-cont">
      <div
        className="login-form"
        onChange={(e) => {
          inputChange(e);
        }}
      >
        <h1 className="login-title">Login</h1>
        <div className="login-input">
          <label htmlFor="email">Email</label>
          <input id="email" type="text" />
        </div>
        <div className="login-input">
          <label htmlFor="password">Password</label>
          <input id="password" type="text" />
        </div>

        <div className="login-actions">
          <button
            className="button-green"
            onClick={async () => {
              // dispatch(onLogin());
              await userLogin(loginCreds);
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
