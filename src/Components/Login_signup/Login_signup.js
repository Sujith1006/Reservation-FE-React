import React, { useState } from 'react';
import Login from './Login/Login';
import Signup from './Signup/Signup';

function Login_signup(props) {
  const[isLogin,setLogin]=useState(true)
  return (
    <div>
      {isLogin?<Login setLoginState={setLogin}/>:<Signup setLoginState={setLogin}/>}
    </div>
  );
}

export default Login_signup;