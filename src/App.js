import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import jwt from "jsonwebtoken";
import TokenService from "./services/tokenService";
import "./App.css";

import PublicRoute from "./components/Utils/PublicRoute";
import PrivateRoute from "./components/Utils/PrivateRoute";
import ErrorBoundary from "./components/Utils/ErrorBoundary";

import Header from "../src/components/Header/Header";
import LandingPage from "./routes/LandingPage/LandingPage";
import Registration from "./routes/Registration/Registration";
import Login from "./routes/LogIn/Login";
import Dashboard from "./routes/Dashboard/Dashboard"

const App = () => {
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (!TokenService.getAuthToken()) return;
    if (TokenService.getAuthToken() && userId == null) {
      setUserId(jwt.decode(TokenService.getAuthToken()).userId);
      setUsername(jwt.decode(TokenService.getAuthToken()).username);
    }
  }, [userId]);

  return (
    <>
      <ErrorBoundary>
        <Router>
          <Header />
          <Switch>
            <PublicRoute
              exact
              path="/"
              component={(props) => (
                <LandingPage
                  {...props}
                  setUserId={setUserId}
                  setUsername={setUsername}
                />
              )}
            />
            <PublicRoute exact path="/register" component={Registration} />
            <PublicRoute
              exact
              path="/login"
              component={(props) => (
                <>
                  <Login
                    {...props}
                    setUserId={setUserId}
                    setUsername={setUsername}
                  />
                </>
              )}
            />
            <PrivateRoute 
            exact
            path="/dashboard"
            component={(props) => <Dashboard {...props} username={username} userId={userId} setUserId={setUserId}/>}    
            />
          </Switch>
        </Router>
      </ErrorBoundary>
    </>
  );
};

export default App;
