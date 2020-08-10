import React, { useState } from "react";
import "../login.css";
import { withRouter } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
import swal from "sweetalert";
import { authApi } from "../../../ApiServer";
function Signup(props) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPAssword] = useState("");
  const checkLogin = () => {
    if (email.length === 0) {
      swal({ icon: "error", text: "Enter Valid Email" });
    } else if (name.length === 0) {
      swal({ icon: "error", text: "Enter Valid Name" });
    } else if (password.length === 0) {
      swal({ icon: "error", text: "Enter Valid Password" });
    } else {
      authApi
        .post("/auth/signup", { email, name, password })
        .then(async (res) => {
          if (res.data.code === 200) {
            swal({ icon: "success", text: "SignedUp successfully" });
            await clearState();
           await props.setLoginState(true)
          } else {
            swal({ icon: "error", text: res.data.error });
          }
        })
        .catch((err) => {
          swal({ icon: "error", text: err });
        });
    }
  };
  const clearState = () => {
    setEmail("");
    setName("");
    setPAssword("");
  };
  return (
    <div>
      <div className="login_signup_div">
        <div className="login_signup_div_inner">
          <div className="formgroup">
            <h1>Create a new account </h1>
          </div>
          <div className="formgroup">
            <TextField
              id="outlined-basic 0"
              label="Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              helperText={name === "" ? "Enter an Username" : ""}
            />
          </div>
          <div className="formgroup">
            <TextField
              id="outlined-basic 1"
              label="E-mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              helperText={email === "" ? "Enter an Valid e-mail" : ""}
            />
          </div>

          <div className="formgroup">
            <TextField
              id="outlined-basic 2"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPAssword(e.target.value)}
              required
              helperText={password.length < 6 ? "Enter an Password" : ""}
            />
          </div>
          <div className="formgroup">
            <Button onClick={checkLogin} variant="contained" color="secondary">
              Signup
            </Button>
          </div>
          <div className="formgroup">
            <span className="btn" onClick={() => props.setLoginState(true)}>
              {" "}
              Click to Login
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Signup);
