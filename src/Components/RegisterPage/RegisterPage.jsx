import React from 'react'
import { Link } from "react-router-dom"

import "./RegisterPage.scss"

function RegisterPage() {
  return (
    <>
      <div className='RegisterPageContainer'>
        <Link to="/events" style={{textDecoration:"none", color: "inherit"}}><button id="loginView">Login</button></Link>
        <Link to="/events" style={{textDecoration:"none", color: "inherit"}}><button id="registerView">Register</button></Link>
      </div>
    </>
  )
}

export default RegisterPage;