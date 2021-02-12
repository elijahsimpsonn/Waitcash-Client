import React from "react";
import TokenService from "../../services/tokenService";
import authApiService from "../../services/authApiService";
import jwt from "jsonwebtoken";
import { Link } from "react-router-dom";
import "./LandingPage.css";

function LandingPage(props) {
    
  const handleLoginSuccess = () => {
    const { location, history } = props;
    const destination = (location.state || {}).from || "/dashboard";

    props.setUserId(jwt.decode(TokenService.getAuthToken()).userId);
    props.setUsername(jwt.decode(TokenService.getAuthToken()).username);

    history.push(destination);
  };

  const handleDemoClick = (e) => {
    e.preventDefault();
    authApiService
      .postLogin({
        user_name: "admin",
        user_password: "testtest123!",
      })
      .then((res) => {
        if (!res.status === 200) {
          return res.json().then((err) => Promise.reject(err));
        }
        TokenService.saveAuthToken(res.authToken);
        handleLoginSuccess();
      })
      .catch((res) => {});
  };

  return (
      <>
    <section className="landing-page">
      <h3>Welcome to WaitCash!</h3>

      <div className="text-section">
        <p>WaitCash is a Full-Stack Application.</p>
        <p><a href="https://github.com/elijahsimpsonn/waitcashv2-server">Want to learn more about it's tech stack? Click me!</a></p>
      </div>

      <div className="text-section">
        <p>
          This application allows you to keep track of wages earned on wait
          shifts.
        </p>
      </div>

      <div className="text-section">
        <p>
          Just want to see it in action? Click the Launch Demo button.
          Otherwise, feel free to sign up or login.
        </p>
      </div>

      <button className="demo-button" onClick={handleDemoClick}>
        Launch Demo
      </button>

      <div className="button-section">
        <Link to="/login">
          <button className="space">Login</button>
        </Link>
        <Link to="/register">
          <button>Sign Up</button>
        </Link>
      </div>

      
    </section>
    <footer className="footer">
        &#169; <a href="http://www.elijahsimpson.com">Elijah Simpson</a> 2021
    </footer>
    </>
  );
}

export default LandingPage;
