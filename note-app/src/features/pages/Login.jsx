import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { onModalOpenClose, onLoginError } from "../../app/Slices/AppSlice";
import { userSignUp, userLogin } from "../../app/Utils/Callouts";
import { selectLoginError } from "../../app/Slices/AppSlice";

const Login = () => {
  const dispatch = useDispatch();
  let loginError = useSelector(selectLoginError);
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
        {loginError && (
          <h1 className="login-error">Incorrect details, please try again</h1>
        )}
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
              const loginStatus = await userLogin(loginCreds);

              if (loginStatus.status === "authorised" && loginStatus.token) {
                navigate("/home");
              } else {
                dispatch(onLoginError());
              }
            }}
          >
            Login
          </button>
          <button
            onClick={async () => {
              const signUpStatus = await userSignUp(loginCreds);

              if (signUpStatus.status === "authorised" && signUpStatus.token) {
                navigate("/home");
              }
            }}
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
