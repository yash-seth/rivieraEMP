import React from 'react'
import { Link } from "react-router-dom"
import "./HomePage.scss"

function HomePage() {
  return (
    <>
      <div className='HomePageContainer'>
        <button id="adminView">Admin</button>
        <Link to="/register" style={{ textDecoration: "none", color: "inherit"}}><button id="participantView">Participant</button></Link>
      </div>
    </>
  )
}

export default HomePage;