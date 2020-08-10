import React, { useState } from "react";
import "../login.css";
import { withRouter } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
import {authApi} from "../../../ApiServer"
import swal from "sweetalert";
function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPAssword] = useState("");
  const checkLogin = () => {
    if (email.length === 0) {
      swal({ text: "Enter Correct E-mail", icon: "error" });
    }
    else if(password.length <5){
      swal({ text: "Enter Correct Password", icon: "error" });
    }
    else{
      authApi.post('/auth/login',{email,password})
      .then(async(res)=>{
        if(res.data.code === 200){
         localStorage.setItem("Usercredential",res.data.token)
         await clearState();
         swal({icon:"success",text:res.data.msg})
         props.history.push('/home')
        }
        else{
          swal({icon:'error',text:res.data.err})
        }
      })
      .catch((err)=>{
        swal({icon:"error",text:err})
        console.log(err)
      })
    }
  };
  const clearState=()=>{
    setEmail('')
    setPAssword('')
  }
  return (
    <div>
      <div className="login_signup_div">
        <div className="login_signup_div_inner">
          <div className="formgroup">
            <h1>Login to Cafe90's</h1>
          </div>
          <div className="formgroup">
            <TextField
              id="outlined-basic login1"
              label="E-mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              helperText={email === "" ? "Enter an E-mail" : ""}
            />
          </div>
          <div className="formgroup">
            <TextField
              id="outlined-basic login2"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPAssword(e.target.value)}
              required
              helperText={password === "" ? "Enter an password" : ""}
            />
          </div>
          <div className="formgroup">
            <Button onClick={checkLogin} variant="contained" color="secondary">
              Login
            </Button>
          </div>
          <div className="formgroup">
            <span onClick={() => props.setLoginState(false)} className="btn">
              {" "}
              Click to Signup
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Login);
