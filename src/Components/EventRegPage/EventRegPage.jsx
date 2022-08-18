import React from 'react'
import {useEffect, useState} from 'react'
import Axios from "axios"
import "./EventRegPage.scss"

function EventRegPage({currentUser}) {
    // const [registeredEvents, setRegisteredEvents] = useState([])
    useEffect(()=>{
        Axios.post("http://localhost:3001/registeredEvents", {userID: currentUser,
        }).then(response => {
          console.log(response)
        });
    })
  return (
    <>
        <div className='EventRegPageHeader'>Registered Events</div>
        <div className='EventRegList'></div>
    </>
  )
}

export default EventRegPage