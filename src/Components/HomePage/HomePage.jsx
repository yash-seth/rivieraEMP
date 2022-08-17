import React from 'react'
import { Link } from "react-router-dom"
import "./HomePage.scss"

function HomePage({ setMode }) {
  return (
    <>
      <div className='HomePageContainer'>
        <Link to="/register" style={{ textDecoration: "none", color: "inherit"}} onClick={()=>setMode('admin')}><button id="adminView">Admin</button></Link>
        <Link to="/register" style={{ textDecoration: "none", color: "inherit"}} onClick={()=>setMode('participant')}><button id="participantView">Participant</button></Link>
      </div>
    </>
  )
}

export default HomePage;