import React, { useState } from 'react'
import { Link, Navigate } from "react-router-dom"
import Axios from 'axios'

import "./RegisterPage.scss"

function RegisterPage({currentUser, setCurrentUser}) {
  const [loginForm, setLoginForm] = useState(false)
  const [registerForm, setRegisterForm] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")


  const verifyLogin = async (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/verify", {username: username,
    password: password
    }).then(response => {
      if(response.data.length === 1) {
        const id = response.data[0]._id;
        setCurrentUser(id)
      }
      else {
        alert("Invalid Login, Please try again or register")
      }
    });
    setUsername("");
    setPassword("");
    };

    const registerUser = async (e) => {
      e.preventDefault();
      Axios.post("http://localhost:3001/register", {username: username,
      password: password
      }).then(alert("User created! Login to proceed!"));
      setUsername("");
      setPassword("");
      };

  return (
    <>
      <div className='RegisterPageContainer'>
        <div>
          <button id="loginView" onClick={()=>{setLoginForm(true);setRegisterForm(false)}}>Login</button>
          <button id="registerView" onClick={()=>{setLoginForm(false);setRegisterForm(true)}}>Register</button>
          <Link to="/" style={{textDecoration: "none", color: "inherit"}}><button id="redirectEvents">Go Back</button></Link>
        </div>
        {loginForm && <div className='loginFormContainer'>
            <label for="username" id="loginFormLabel">Username: <input type="text" name="username" onChange={(e)=>setUsername(e.target.value)}/></label>
            <label for="password" id="loginFormLabel">Password: <input type="text" name="password" onChange={(e)=>setPassword(e.target.value)}/></label>
            <Link to="/events" style={{textDecoration:"none", color: "inherit"}}><button id="LogIn" onClick={(e)=>{setLoginForm(false);setRegisterForm(false);verifyLogin(e)}}>Log In</button></Link>
          </div>}
          {registerForm && <div className='registerFormContainer'>
            <label for="username" id="registerFormLabel">Username: <input type="text" name="username" onChange={(e)=>setUsername(e.target.value)}/></label>
            <label for="password" id="registerFormLabel">Password: <input type="text" name="password" onChange={(e)=>setPassword(e.target.value)}/></label>
            <Link to="/events" style={{textDecoration:"none", color: "inherit"}}><button onClick={(e)=>{setLoginForm(false);setRegisterForm(false);registerUser(e)}} id="registerBtn">Register</button></Link>
          </div>}
          {currentUser!=null ? <Navigate to="/events" /> : null}
      </div>
    </>
  )
}

export default RegisterPage;