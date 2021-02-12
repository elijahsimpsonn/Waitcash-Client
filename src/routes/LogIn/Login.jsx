import React, { useState } from "react";
import jwt from "jsonwebtoken";
import { Link } from "react-router-dom";
import TokenService from "../../services/tokenService";
import authApiService from "../../services/authApiService";
import "./Login.css";

const Login = (props) => {
  const [error, setError] = useState(null);

  const handleLoginSuccess = () => {
    const { location, history } = props;
    const destination = (location.state || {}).from || "/dashboard";

    props.setUserId(jwt.decode(TokenService.getAuthToken()).userId);
    props.setUsername(jwt.decode(TokenService.getAuthToken()).username);
    history.push(destination);
  };

  const handleSubmitJwtAuth = (e) => {
    e.preventDefault();
    setError(null);
    const { user_name, user_password } = e.target;

    authApiService
      .postLogin({
        user_name: user_name.value,
        user_password: user_password.value,
      })
      .then((res) => {
        if (!res.status === 200) {
          return res.json().then((error) => Promise.reject(error));
        }
        user_name.value = "";
        user_password.value = "";
        TokenService.saveAuthToken(res.authToken);
        handleLoginSuccess();
      })
      .catch((res) => {
        setError({ error: res.error });
      });
  };

  return (
    <>
      <h2>Login</h2>
      <>
        <form onSubmit={handleSubmitJwtAuth}>
          {error && <div>{error.error}</div>}
          <input
            required
            type="text"
            id="user_name"
            placeholder="username"
            aria-label="username"
          />
          <br/>
          <input
            required
            type="password"
            id="user_password"
            placeholder="password"
            aria-label="password"
          />
          <br />
          <button type="submit"> Login </button>
        </form>
      </>
      <div className="links">
        <p>
          <Link to="/register">No account? Register Here!</Link>
        </p>
        <p>
          <Link to="/">Want to head back to the Landing Page?</Link>
        </p>
      </div>
    </>
  );
};

Login.defaultProps = {
  location: {},
  history: {
    push: () => {},
  },
};

export default Login;
