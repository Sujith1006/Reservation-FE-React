import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginSignup from "./Components/Login_signup/Login_signup";
import Homepage from "../src/Components/Home/homepage"
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <LoginSignup/>
          </Route>
          <Route exact path="/home">
            <Homepage/>
            </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
