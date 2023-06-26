import "./Login.css";
const Login = () => {
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
          <button className="button-green">Login</button>
          <button className="button-orange">Sign up</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
